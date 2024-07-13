import ytstream from "yt-stream"
import axios from "axios"

const music = async (req, res) => {

    const compID = req.body.compID;
    const worksResponse = await axios.get(`https://api.openopus.org/work/list/composer/${compID}/genre/all.json`);

    const compName = worksResponse.data.composer.complete_name;
    const workNames = worksResponse.data.works

    var titles = []
    for (let i of workNames) {
        console.log("--------------");
        console.log(`${i.title} by ${compName}`);
        const searchTerm = `${i.title} ${compName}`

        const results = await ytstream.search(searchTerm);

        titles.push(results[0].title)

        console.log(results[0].url);
        console.log(results[0].id);
        console.log(results[0].title);
        console.log("--------------");
    };

    res.send(titles)
};

export { music }

// https://docs.google.com/uc?export=download&id=1KAk_m-PLFD8oT5EJ2JDBqx_Q0TqCeSEx