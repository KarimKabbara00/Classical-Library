import axios from "axios";
import { openAI, supabase } from "../utils/clients.js";

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

function processTime(seconds, as_ms = false) {
    return new Date(seconds * (as_ms ? 1 : 1000)).toISOString().slice(11, 19);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function formatDate(date) {
    // change date obj to format: July 1, 1926

    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    }

    const day = (parseInt(date.getDate()) + 1).toString(); // for some reason its off by 1
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`
}

async function fetchFourWorks(composerId) {
    const workResponse = await axios.get(`https://api.openopus.org/work/list/composer/${composerId}/genre/all.json`);

    // grab four works from all works
    var works = workResponse.data.works.slice(0, 4);

    // for each work, find its yt_link
    for (let i of works) {
        const { data, error } = await supabase.from("youtube_work_links").select("yt_link").eq("work_id", i.id);
        i.url = error ? "" : data[0].yt_link;
    }

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

function shuffleWorks(array) {
    // start at end
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        // rand from 0 to current index
        let randomIndex = Math.floor(Math.random() * currentIndex);
        // narrow the window 
        currentIndex--;
        // swap a elements 
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export { askGPT, processTime, sleep, formatDate, fetchFourWorks, getAllWorks, shuffleWorks }