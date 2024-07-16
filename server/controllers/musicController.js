import ytdl from "@distube/ytdl-core";
import { supabase } from "../utils/clients.js";

const musicByURL = async (req, res) => {
    const url = req.body.url
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
    res.header("Content-Type", "audio/mpeg");
    res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
    ytdl(url, { format: audioFormat }).pipe(res);
};


const musicByID = async (req, res) => {

    try {
        const workID = req.body.workID;
        const { data, error } = await supabase.from("youtube_work_links").select("yt_link").eq("work_id", workID)

        if (error)
            throw error;

        const url = data[0].yt_link;

        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
        res.header("Content-Type", "audio/mpeg");
        res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
        ytdl(url, { format: audioFormat }).pipe(res);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

};

export { musicByURL, musicByID }