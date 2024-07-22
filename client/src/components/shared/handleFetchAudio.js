import axios from "axios";

async function handleFetchAudio(byURL, urlOrID) {

    try {
        const metadataResp = await axios.get(`http://localhost:3001/api/musicMetadata?byURL=${byURL}&urlOrID=${urlOrID}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const metadata = metadataResp.data;

        var response, endpoint, queryVar;
        if (byURL === true) {  // send url
            endpoint = "musicByURL";
            queryVar = "url";
        }
        else {
            endpoint = "musicByID";
            queryVar = "workID";
        }

        response = await axios.get(`http://localhost:3001/api/${endpoint}?${queryVar}=${encodeURIComponent(urlOrID)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response || !endpoint || !queryVar) {
            throw "ERROR MAKING REQUEST!";
        }

        var audioObject = new Audio();
        audioObject.src = `http://localhost:3001/api/${endpoint}?${queryVar}=${encodeURIComponent(urlOrID)}`

        return [audioObject, metadata];
    }
    catch (e) {
        console.log(e);
    }

};

export default handleFetchAudio;