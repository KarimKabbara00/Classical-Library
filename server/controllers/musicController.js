import ytdl from "ytdl-core";

const getMusic = async (req, res) => {
    try {
        const url = req.body.url
        const info = await ytdl.getInfo(url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", `attachment; filename="audio.mp3"`);

        console.log("finna pipe")
        ytdl(url, { format: audioFormat }).pipe(res);
        console.log("piped")
    }
    catch (e) {
        console.log(e)
    }

};

export { getMusic }