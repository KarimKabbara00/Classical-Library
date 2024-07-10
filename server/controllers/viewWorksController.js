import axios from "axios";
import { sleep, processTime } from "../utils/helperFunctions.js";

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

        // TODO: QUERY SUPABASE DB FOR DURATION AND URL

        // add duration to every work
        response.data.works.forEach((item) => {
            item["duration"] = processTime(0);
            item["url"] = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
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