import { supabase } from "../utils/clients.js";
import { sleep } from "../utils/helperFunctions.js";

const getMapMarkers = async (req, res) => {
    const { data, error } = await supabase.from("markers").select("*");

    if (error) {
        res.status(400).send({})
    }
    else {
        await sleep(2000);
        res.status(200).send(data);
    }
};

export { getMapMarkers }