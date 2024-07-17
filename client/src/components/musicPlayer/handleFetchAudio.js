import axios from "axios";

async function handleFetchAudio(byURL, urlOrID) {
    const workMetadata = await axios.post("http://localhost:3001/api/musicMetadata", {
        byURL: byURL,
        urlOrID: urlOrID
    });
    const metadata = workMetadata.data;

    var response;
    if (byURL === true) {  // send url
        response = await fetch("http://localhost:3001/api/musicByURL", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlOrID })
        });
    }
    else {
        response = await fetch("http://localhost:3001/api/musicByID", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workID: urlOrID })
        });
    }

    var audioObject = null;
    if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audioObject = new Audio(audioUrl);
    }
    else {
        console.error("Error fetching audio");
    }
    return [audioObject, metadata];
};

export default handleFetchAudio;