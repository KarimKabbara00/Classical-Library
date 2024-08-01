import ytdl from "@distube/ytdl-core";
import { supabase } from "../utils/clients.js";
import axios from "axios";

const musicByURL = async (req, res) => {
    const url = req.query.url
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: "lowest", filter: 'audioonly' });
    res.header("Content-Type", "audio/mpeg");
    res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
    ytdl(url, { format: audioFormat }).pipe(res);
};


const musicByID = async (req, res) => {

    try {
        const workID = req.query.workID;
        const { data, error } = await supabase.from("youtube_work_links").select("yt_link").eq("work_id", workID)

        if (error)
            throw error;

        const url = data[0].yt_link;

        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: "lowest", filter: 'audioonly' });
        res.header("Content-Type", "audio/mpeg");
        res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
        ytdl(url, { format: audioFormat }).pipe(res);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

};

const musicMetadata = async (req, res) => {
    try {
        const { byURL, urlOrID } = req.query;

        var workID = urlOrID; // if the if statement fails, we already have workID, otherwise this gets reassigned
        if (byURL === "true") {
            const { data, error } = await supabase.from("youtube_work_links").select("work_id").eq("yt_link", urlOrID);
            if (error)
                throw error;
            workID = data[0].work_id;
        }
        const metaDataResponse = await axios.get(`https://api.openopus.org//work/list/ids/${workID}.json`);

        // extract meta data
        const title = metaDataResponse.data.works[`w:${workID}`].title;
        const composerName = metaDataResponse.data.works[`w:${workID}`].composer.complete_name;
        const portrait = metaDataResponse.data.abstract.composers.portraits[0];

        res.status(200).send({
            title: title,
            composerName: composerName,
            portrait: portrait
        })
    }

    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export { musicByURL, musicByID, musicMetadata }