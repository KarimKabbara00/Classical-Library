import { getAllWorks } from "../utils/helperFunctions.js";

const allWorks = async (req, res) => {
    const data = await getAllWorks();
    let giganticString = "^__^";
    for (let i of data) {
        giganticString += `${i.workID}$$${i.workTitle}$$${i.complete_name}$$${i.composer_portrait}^__^`;
    }
    res.status(200).send(giganticString)
}


export { allWorks }