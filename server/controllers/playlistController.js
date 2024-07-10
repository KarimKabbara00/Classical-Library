import axios from "axios";
import { supabase } from "../utils/clients.js";
import { sleep, getAllWorks } from "../utils/helperFunctions.js";

const viewPlaylists = async (req, res) => {
    const { data, error } = await supabase.from("playlists").select("playlist_name, playlist_work_ids").eq("associated_uid", req.body.user_id);
    try {
        if (error) {
            throw error
        }
        var playlistData = []; // holds all playlists and list of works for each

        // go through list of work IDs stored in DB
        for (let entry of data) {
            let playlistEntry = {}
            playlistEntry.playlistName = entry.playlist_name;
            playlistEntry.works = [];

            // join all work IDs to make one request
            let ids = entry.playlist_work_ids.join(",");

            // grab all work data for ids
            const response = await axios.get(`https://api.openopus.org/work/list/ids/${ids}.json`);

            // for every work data, pull title and composer complete name
            entry.playlist_work_ids.forEach(id => {
                playlistEntry.works.push({
                    workID: id,
                    title: response.data.works[`w:${id}`].title,
                    complete_name: response.data.works[`w:${id}`].composer.complete_name
                })
            });
            playlistData.push(playlistEntry);

        }
        await sleep(2000);
        res.status(200).send(playlistData);
    }
    catch (e) {
        console.log(e)
        res.status(400).send([]);
    }
}

const createPlaylist = async (req, res) => {
    try {
        const { userID, playlistName, playlistData } = req.body;
        let workIDs = playlistData.map(work => work.workID);

        console.log(playlistData)

        const { data, error } = await supabase.from("users").select("id").eq("id", userID);

        // double check only 1 email exists
        if (data.length > 1 || error)
            throw error ? error : "Multiple emails found";

        const insertData = {
            playlist_name: playlistName,
            playlist_work_ids: workIDs,
            associated_uid: userID,
        }

        const { insertError } = await supabase.from("playlists").insert(insertData)
        if (insertError)
            throw insertError;

        res.status(200).send({});

    }
    catch (e) {
        res.status(400).send(e);
    }

};

const allWorks = async (req, res) => {
    try {
        const response = await getAllWorks();
        res.status(200).send(response)
    }
    catch (e) {
        res.status(400).send(e)
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const { userID, playlistName } = req.body;
        const { error } = await supabase.from("playlists").delete().match({
            associated_uid: userID,
            playlist_name: playlistName
        })
        if (error) {
            throw error
        }

        res.status(200).send({})
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
};

const checkPlaylistRecord = async (req, res) => {
    const { userID, newPlaylistName } = req.body;
    try {
        const { data, error } = await supabase.from("playlists").select("playlist_name").match({
            associated_uid: userID,
            playlist_name: newPlaylistName
        })
        console.log(data)
        if (error) { // both should be null
            throw error;
        }
        if (data.length > 0) {
            res.status(200).send({ success: false })
        }
        else {
            res.status(200).send({ success: true })
        }
    }
    catch (e) {
        res.status(400).send({ success: false, error: e })
    }

};

const fetchPlaylist = async (req, res) => {
    try {
        const { userID, playlistName } = req.body;
        console.log(userID, playlistName)
        const { data, error } = await supabase.from("playlists").select("playlist_work_ids").match({
            associated_uid: userID,
            playlist_name: playlistName
        });

        if (error)
            throw error

        const ids = data[0].playlist_work_ids;
        const workDetails = (await axios.get(`https://api.openopus.org/work/list/ids/${ids.join(",")}.json`)).data.works;

        // grab work details
        var works = [];
        for (let id of ids) {
            works.push({
                workID: id,
                title: workDetails[`w:${id}`].title,
                complete_name: workDetails[`w:${id}`].composer.complete_name
            })
        }

        res.status(200).send({
            playlistName: playlistName,
            works: works
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

}

const editPlaylist = async (req, res) => {

    try {
        const { userID, oldPlaylistName, playlistName, playlistData } = req.body;

        // pull work IDs
        let workIDs = playlistData.map(work => work.workID);

        // row to update
        const newRecord = { playlist_name: playlistName, associated_uid: userID, playlist_work_ids: workIDs };

        const { error } = await supabase.from("playlists").update(newRecord).match({
            associated_uid: userID,
            playlist_name: oldPlaylistName
        });

        if (error)
            throw error;

        res.status(200).send({})
    }
    catch (e) {
        console.log(e)
        res.status(400).send(error)
    }
}

export { viewPlaylists, createPlaylist, allWorks, deletePlaylist, checkPlaylistRecord, fetchPlaylist, editPlaylist }