import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components//Footer";
import Home from "./pages/Home"
import About from "./pages/About"
import SearchResults from "./pages/SearchResults"
import ViewComposer from "./pages/ViewComposer"
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ViewWorks from "./pages/ViewWorks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  // this state is passed across all components! // UNDO THIS!
  const [loading, setLoading] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [audioObject, setAudioObject] = useState(null);

  return (
    <div>
      <Header />
      {showMusicPlayer && <MusicPlayer audioObject={audioObject}/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults loading={loading} setLoading={setLoading} />} />
          <Route path="/viewComposer" element={<ViewComposer />} />
          <Route path="/viewWorks" element={<ViewWorks audioObject={audioObject} setAudioObject={setAudioObject} currentSong={currentSong} setCurrentSong={setCurrentSong} showMusicPlayer={showMusicPlayer} setShowMusicPlayer={setShowMusicPlayer} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
