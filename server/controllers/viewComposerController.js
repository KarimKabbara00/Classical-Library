import axios from "axios";
import { supabase } from "../utils/clients.js";
import { sleep, askGPT } from "../utils/helperFunctions.js";

const viewComposer = async (req, res) => {
    // pull composer ID from request parameters and make api call to get composer and genre info
    var id = req.query.id.replace("/", "");

    // get composer
    const compResponse = await axios.get(`https://api.openopus.org/genre/list/composer/${id}.json`);

    if (compResponse.data.status.success == "false") {
        res.status(400).send({}) // sending nothing will cause catch to be executed on the frontend
    }
    else {
        try {
            // ask ChatGPT for a brief description about this composer
            const composerName = compResponse.data.composer.complete_name;
            const openAIDescriptionResponse = await askGPT(`Give me a brief description about the music composer ${composerName}. Your answer should 
                                                    be at least 95 words. Do not exceed 100 words.`);

            const openAITimelineResponse = await askGPT(`Give me a timeline of the life of the music composer ${composerName}. Follow these instructions: 
                                                You must give me exactly 5 significant dates, each date on a new line. Use only 1 sentence. Answer using this format: 
                                                February 15, 1947: some words here.`);

            // hopefully gpt answers with "YYYY-MM-DD\nYYYY-MM-DD"
            const description = openAIDescriptionResponse.choices[0].message.content;
            const timeline = openAITimelineResponse.choices[0].message.content.split("\n").filter((el) => el !== "");

            // grab dob, dod
            const { data, error } = await supabase.from("composer_dates").select("composer_dob, composer_dod").eq("composer_id", id);
            if (error || data.length === 0) {
                const requestError = !error ? "No match found" : error
                res.status(400).send(requestError);
            }
            else {
                const dob = data[0].composer_dob.replaceAll("/", "-").replace(new RegExp("\\b-0-0\\b"), ""); // unknown exact dobs will look like 1135-0-0 so only keep year
                const dod = data[0].composer_dod ? data[0].composer_dod.replaceAll("/", "-").replace(new RegExp("\\b-0-0\\b"), "") : "N/A";

                await sleep(2000);
                res.status(200).send({
                    composerData: compResponse.data.composer,
                    genreData: compResponse.data.genres,
                    description: description,
                    born: dob,
                    died: dod,
                    timeline: timeline,
                });
            }
        }
        catch (e) {
            res.status(400).send(e)
            console.log(e);
        }
    }
}

export { viewComposer }