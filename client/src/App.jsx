import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/navigation/Header";
// import Footer from "./components//Footer";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import AllComposers from "./pages/AllComposers";
import ViewComposer from "./pages/ViewComposer";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ViewWorks from "./pages/ViewWorks";
import toast, { Toaster } from 'react-hot-toast';
import SignIn from "./pages/SignIn";
import Cookies from 'js-cookie';

function App() {

  /* -------------------------------- User Session -------------------------------- */
  const [accessToken, setAccessToken] = useState(null)
  function logout() {
    try {
      Cookies.remove('accessToken');
      setAccessToken(null);
      toast.success("Logged out")
    }
    catch (err) {
      console.log(err)
      toast.error("Error logging out")
    }
  }
  useEffect(() => {
    Cookies.set("accessToken", accessToken, { expires: 2 }); // 2 day expiration
  }, [accessToken]);
  /* -------------------------------- User Session -------------------------------- */

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

  /* ------------------------------ Homepage On Load ------------------------------ */
  // we dont want to show the home page animation on every render
  // wait 2 seconds for all anims to finish on load then set to false
  const [firstLoad, setFirstLoad] = useState(true);
  setTimeout(() => {
    setFirstLoad(false);
  }, 2000)
  /* ------------------------------ Homepage On Load ------------------------------ */

  return (
    <div>
      {/* <div>session is : {accessToken}</div> */}
      <BrowserRouter>
        <Header accessToken={accessToken} logout={logout} />
        <Routes>
          <Route path="/" element={
            <Home
              setAccessToken={setAccessToken}
              firstLoad={firstLoad}
              audioObject={audioObject}
              setAudioObject={setAudioObject}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              showOrHideMusicPlayer={showOrHideMusicPlayer}
            />}
          />
          <Route path="/map" element={<Map />} />
          <Route path="/allComposers" element={<AllComposers />} />
          <Route path="/viewComposer" element={<ViewComposer />} />
          <Route path="/viewWorks" element={
            <ViewWorks
              audioObject={audioObject}
              setAudioObject={setAudioObject}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              showOrHideMusicPlayer={showOrHideMusicPlayer}
              animInOut={animInOut}
            />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/signIn" element={<SignIn setAccessToken={setAccessToken} />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>


      {showMusicPlayer && <MusicPlayer audioObject={audioObject} setAudioObject={setAudioObject} volume={volume} setVolume={setVolume} currentSong={currentSong} setCurrentSong={setCurrentSong} animInOut={animInOut} showOrHideMusicPlayer={showOrHideMusicPlayer} />}
      <div>
        <Toaster
          position="top-left"
          reverseOrder={false}
          containerStyle={{
            position: "absolute",
            top: 80,
            left: 80,
            bottom: 20,
            right: 20,
          }}
        />
      </div>
    </div>
  );
}

export default App;
