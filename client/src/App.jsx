import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components//Footer";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import SearchResults from "./pages/SearchResults";
import ViewComposer from "./pages/ViewComposer";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ViewWorks from "./pages/ViewWorks";
import styles from "./css/main.module.css";

function App() {
  /* -------------------------------- Music Player -------------------------------- */
  const [currentSong, setCurrentSong] = useState({ title: "", composer: "", portrait: "" });
  const [audioObject, setAudioObject] = useState(null);
  const [volume, setVolume] = useState(50); // volume in top level to keep state on unrender
  const [showMusicPlayer, setShowMusicPlayer] = useState(false); // render or unrender music player
  const [animInOut, setAnimInOut] = useState(true); // hide or show music player before render/unrender
  function showOrHideMusicPlayer(showOrHide) {
    setAnimInOut(showOrHide); // true shows it, false hides it
    if (showOrHide === true) {
      setShowMusicPlayer(true);
    } else {
      // hide
      setTimeout(() => {
        setShowMusicPlayer(false);
        setCurrentSong({ title: "", composer: "", portrait: "" });
        setAudioObject(null); // destroy object
      }, 200);
    }
  }
  /* -------------------------------- Music Player -------------------------------- */

  return (
    <div className={styles.mainApp}>
      {showMusicPlayer && <MusicPlayer audioObject={audioObject} setAudioObject={setAudioObject} volume={volume} setVolume={setVolume} currentSong={currentSong} setCurrentSong={setCurrentSong} animInOut={animInOut} showOrHideMusicPlayer={showOrHideMusicPlayer} />}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/viewComposer" element={<ViewComposer />} />
          <Route
            path="/viewWorks"
            element={<ViewWorks audioObject={audioObject} setAudioObject={setAudioObject} currentSong={currentSong} setCurrentSong={setCurrentSong} showOrHideMusicPlayer={showOrHideMusicPlayer} animInOut={animInOut} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
