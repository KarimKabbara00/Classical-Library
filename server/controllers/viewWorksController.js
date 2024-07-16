import axios from "axios";
import { sleep, processTime } from "../utils/helperFunctions.js";
import { supabase } from "../utils/clients.js";

const viewWorks = async (req, res) => {
    var id = req.query.id;
    var genre = req.query.genre;

    const response = await axios.get(`https://api.openopus.org/work/list/composer/${id}/genre/all.json`);
    const allGenresResponse = await axios.get(`https://api.openopus.org/genre/list/composer/${id}.json`);

    if (response.data.status.success == "false" || allGenresResponse.data.status.success == "false" || !(allGenresResponse.data.genres.includes(genre))) {
        res.status(400).send() // 400 will throw an error at the frontend
    }
    else {
        await sleep(2000);

        const composerName = response.data.composer.complete_name;

        // grab all work yt links
        const { data, error } = await supabase.from("youtube_work_links").select("*").eq("composer_name", composerName);

        // convert data from list of objects to one big object with workID as key and everything else as value
        var worksDict = {}
        data.forEach(work => {
            worksDict[work.work_id] = work;
        });

        // add duration and yt link to every work
        response.data.works.forEach((item) => {
            item["duration"] = processTime(worksDict[item.id].duration_ms, true);
            item["url"] = worksDict[item.id].yt_link;
        })

        res.status(200).send({
            works: response.data.works,
            allGenres: allGenresResponse.data.genres,
            composer: response.data.composer.complete_name,
            portrait: response.data.composer.portrait,
        });
    }
};

export { viewWorks }