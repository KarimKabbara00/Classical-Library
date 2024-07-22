import axios from "axios";
import { sleep } from "../utils/helperFunctions.js";

const allComposers = async (req, res) => {

    // make api call for all composers.
    const response = await axios.get("https://api.openopus.org/composer/list/search/.json");
    const success = response.data.status.success;
    const errorMessage = response.data.status.error;
    if (success === "true") {
        // if request is successful pull list of composers
        const composersArray = response.data.composers;

        // extract name and portrait for list view
        var composerInfo = [];
        composersArray.forEach((element) => {
            composerInfo.push({
                id: element.id,
                name: element.complete_name,
                portrait: element.portrait,
            });
        });

        // await sleep(2000);
        res.status(200).send({
            allComposers: composerInfo,
        });
    }
    else {
        // if request fails, stay on home page
        res.status(400).send({
            query: query,
            allComposers: response.data.status.error,
        });
    }
}

export { allComposers }