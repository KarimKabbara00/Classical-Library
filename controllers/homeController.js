import axios from "axios";
import { supabase } from "../utils/clients.js";
import { readFile } from 'fs/promises';
import { writeFile } from "fs";
import { askGPT, fetchFourWorks, formatDate } from "../utils/helperFunctions.js";

const birthday = async (req, res) => {

  try {
    const today = new Date();
    const todayMs = today.setUTCHours(0, 0, 0, 0);
    const { data, error } = await supabase.from("composer_dates").select("composer_id, composer_dob");

    if (error)
      throw error;

    var datesGreaterThanToday = []; // holds all dates after today
    for (let i of data) {
      let noYear = i.composer_dob.slice(4, i.composer_dob.length);

      // unknown exact dob
      if (noYear === "/0/0")
        continue

      let modifiedDate = today.getFullYear().toString() + noYear;
      let date = new Date(modifiedDate).setUTCHours(0, 0, 0, 0); // the ms of the composer DOB modified to the current year

      if (date >= todayMs) {
        datesGreaterThanToday.push({ compID: i.composer_id, dob: date });
      }
    }

    // three closest birthdays to today (including today)
    const nextThreeDOBs = datesGreaterThanToday.sort((a, b) => a.dob - b.dob).slice(0, 3);

    // for three composers, extract necessary information for bday carousel
    for (let i of nextThreeDOBs) {
      const compResponse = await axios.get(`https://api.openopus.org/composer/list/ids/${i.compID}.json`);
      i.dob = formatDate(new Date(i.dob));
      i.complete_name = compResponse.data.composers[0].complete_name;
      i.portrait = compResponse.data.composers[0].portrait;
      i.fourWorks = await fetchFourWorks(i.compID);
    }

    res.status(200).send({
      composerData: nextThreeDOBs
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
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