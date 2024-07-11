import axios from "axios";
import { sleep, getAllWorks } from "../utils/helperFunctions.js";

const allWorks = async (req, res) => {
    const data = await getAllWorks()
}


export { allWorks }