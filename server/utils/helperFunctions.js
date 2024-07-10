import axios from "axios";
import { openAI } from "../utils/clients.js";

async function askGPT(query) {
    const openAIResponse = await openAI.chat.completions.create({
        messages: [
            {
                role: "user",
                content: query,
            },
        ],
        model: "gpt-4o",
    });
    return openAIResponse;
}

function processTime(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function formatDate(date) {
    // change 1926/07/01 to July 1, 1926
    const months = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    }
    date = date.split("/")
    const day = parseInt(date[2]).toString();
    const month = parseInt(date[1]).toString();
    const year = date[0]

    return `${months[month]} ${day}, ${year}`
}

async function fetchFourWorks(composerId) {
    const workResponse = await axios.get(`https://api.openopus.org/work/list/composer/${composerId}/genre/all.json`);
    // add duration to every work
    var works = workResponse.data.works.slice(0, 4);
    works.forEach((item) => {
        item["composerId"] = composerId;
        item["url"] = "https://www.youtube.com/watch?v=vyDpyXsyOkE";
    })

    return works;
}

async function getAllWorks() {
    try {
        const response = await axios.get(`https://api.openopus.org/work/list/ids/.json`)
        const allWorks = response.data.works;
        var allWorksList = []

        // grab information we need in a format we want
        for (let i of Object.keys(allWorks)) {
            allWorksList.push({
                workID: allWorks[i].id,
                workTitle: allWorks[i].title,
                complete_name: allWorks[i].composer.complete_name,
                composer_portrait: allWorks[i].composer.portrait
            })
        }
    }
    catch (e) {
        console.log(e);
    }
    return allWorksList
}

export { askGPT, processTime, sleep, formatDate, fetchFourWorks, getAllWorks }