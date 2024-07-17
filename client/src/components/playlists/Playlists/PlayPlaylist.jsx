import { useEffect, useState } from "react";

function PlayPlaylist(props) {

    useEffect(() => {
        console.log(props.queue)
        handleFetchAudio(props.queue[0]);
    }, []);

    async function handleFetchAudio(work) {
        // if another song is played while something already is playing, reset time.
        if (props.audioObject !== null) {
            props.audioObject.pause();
            props.audioObject.currentTime = 0;
        }

        var response = await fetch("http://localhost:3001/api/musicByID", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ workID: work.id })
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioObject = new Audio(audioUrl);
            props.setCurrentSong({ title: work.title, composer: work.composer, portrait: work.portrait });
            props.showOrHideMusicPlayer(true);
            props.setAudioObject(audioObject);
            audioObject.play();
        } else {
            console.error("Error fetching audio");
        }
    };

}

export default PlayPlaylist;