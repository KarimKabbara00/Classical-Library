import axios from "axios";
import { supabase } from "../utils/clients.js";
import { readFile } from 'fs/promises';
import { writeFile } from "fs";
import { askGPT, fetchFourWorks, formatDate } from "../utils/helperFunctions.js";

const birthday = async (req, res) => {

  const today = new Date();
  const todayMs = today.setUTCHours(0, 0, 0, 0);
  const { data, error } = await supabase.from("composer_dates").select("id, composer_dob");
  if (!error) {
    var ids = [];
    for (let i of data) {
      if (i.composer_dob.includes("/0/0"))
        continue

      let modifiedDate = (today.getFullYear() + i.composer_dob.slice(4, i.composer_dob.length)).split("/")
      let modifiedDateMs = new Date(parseInt(modifiedDate[0]), parseInt(modifiedDate[1]) - 1, parseInt(modifiedDate[2])).setUTCHours(0, 0, 0, 0);

      // only keep dates greater than today  
      if (modifiedDateMs >= todayMs) {
        i.ms = modifiedDateMs // store modified ms
        ids.push(i);
      }
    }
    // sort bday (ms) by ascending order and keep the first three, then resort by id
    ids = ids.sort((a, b) => a.ms - b.ms).slice(0, 3).sort((a, b) => a.id - b.id);

    // get their composer Ids
    const composerOne = ids[0].id;
    const composerTwo = ids[1].id;
    const composerThree = ids[2].id;

    // gather information about them
    var compResponse = await axios.get(`https://api.openopus.org/composer/list/ids/${composerOne},${composerTwo},${composerThree}.json`);

    // Gather 4 works for each composer
    // it appears the data comes back backwards hence the reversed composer variables
    compResponse.data.composers[0]["recommendedWorks"] = await fetchFourWorks(composerThree);
    compResponse.data.composers[1]["recommendedWorks"] = await fetchFourWorks(composerTwo);
    compResponse.data.composers[2]["recommendedWorks"] = await fetchFourWorks(composerOne);

    // sort by id to merge 'var ids' and composerData
    var composerData = compResponse.data.composers.sort((a, b) => a.id - b.id);

    // format dates
    composerData[0].birth = formatDate(ids[0].composer_dob);
    composerData[1].birth = formatDate(ids[1].composer_dob);
    composerData[2].birth = formatDate(ids[2].composer_dob);

    // finally resort by birth
    composerData.sort((a, b) => new Date(a.birth).setUTCHours(0, 0, 0, 0) - new Date(b.birth).setUTCHours(0, 0, 0, 0))

    res.status(200).send({
      composerData: composerData,
    })
  }
  else {
    res.status(400).send(error)
  }
};

const qotd = async (req, res) => {

  const filepath = "./qotd.json"
  const data = JSON.parse(await readFile(filepath, "utf-8"))
  const today = new Date().setUTCHours(0, 0, 0, 0);

  // if today is greater than last timestamp, clear file for new QOTDs
  if (today > data.timestamp) {
    writeFile(filepath, JSON.stringify({}), (err) => { if (err) console.log("ERROR WRITING TO FILE", err) })
  }

  // if we have kv pairs in the file
  if (Object.keys(data).length !== 0) {
    res.status(200).send(data);
  }
  else {
    try {
      // call the random work endpoint. grab the first three works' composers
      const response = await axios.get(`https://api.openopus.org/dyn/work/random`);

      const composerOne = response.data.works[0].composer.complete_name;
      const composerTwo = response.data.works[1].composer.complete_name;
      const composerThree = response.data.works[2].composer.complete_name;

      const quoteOne = await askGPT(`Give me a quote from the composer ${composerOne}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)
      const quoteTwo = await askGPT(`Give me a quote from the composer ${composerTwo}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)
      const quoteThree = await askGPT(`Give me a quote from the composer ${composerThree}. Just answer with the quote, nothing else. Don't put quotation marks around the answer. Make sure the quote you pick is at least 15 words long.`)

      const data = {
        timestamp: today,
        [composerOne]: quoteOne.choices[0].message.content,
        [composerTwo]: quoteTwo.choices[0].message.content,
        [composerThree]: quoteThree.choices[0].message.content
      }

      writeFile(filepath, JSON.stringify(data), (err) => { if (err) console.log("ERROR WRITING TO FILE", err) })
      res.status(200).send(data)
    }
    catch (error) {
      res.status(400).send(error)
    }
  }
};

export { birthday, qotd }