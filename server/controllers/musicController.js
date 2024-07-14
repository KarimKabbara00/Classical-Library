import ytstream from "yt-stream"
import axios from "axios"

const music = async (req, res) => {

    const compID = req.body.compID;
    const worksResponse = await axios.get(`https://api.openopus.org/work/list/composer/${compID}/genre/all.json`);

    const compName = worksResponse.data.composer.complete_name;
    const workNames = worksResponse.data.works

    var titles = []
    for (let i of workNames) {
        const searchTerm = `${i.title} ${compName}`
        const results = await ytstream.search(searchTerm);
        if (results[0]) {
            titles.push([i.id, results[0].url, results[0].title, compName])
            console.log(i.id, results[0].url, results[0].title, compName)
        }
        else {
            titles.push([i.id, "ERROR", "ERROR", compName])
            console.log(i.id, "ERROR", "ERROR", compName)
        }
    };

    res.send(titles)
};

export { music }

// https://docs.google.com/uc?export=download&id=1KAk_m-PLFD8oT5EJ2JDBqx_Q0TqCeSEx