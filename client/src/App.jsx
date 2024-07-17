import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Header from "./components/navigation/Header";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import AllComposers from "./pages/AllComposers";
import AllWorks from "./pages/AllWorks";
import ViewComposer from "./pages/ViewComposer";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ViewWorks from "./pages/ViewWorks";
import SignIn from "./pages/SignIn";
import Playlists from "./pages/Playlists";
import NewPlaylist from "./components/playlists/NewPlaylist/NewPlaylist";
import EditPlaylist from "./components/playlists/Playlists/EditPlaylist";
import Profile from "./pages/Profile";
import Trivia from "./pages/Trivia";
import TriviaQuiz from "./components/trivia/TriviaQuiz";


function App() {

  /* -------------------------------- User Session -------------------------------- */
  const [sessionData, setSessionData] = useState(null)
  function logout() {
    try {
      Cookies.remove('sessionData');
      setSessionData(null);
      toast.success("Logged out")
    }
    catch (err) {
      console.log(err)
      toast.error("Error logging out")
    }
  }
  useEffect(() => {
    Cookies.set("sessionData", sessionData, { expires: 2 }); // 2 day expiration
  }, [sessionData]);
  /* -------------------------------- User Session -------------------------------- */

  /* -------------------------------- Music Player -------------------------------- */
  const [musicRequest, setMusicRequest] = useState(null);
  function fetchAudio(byURL, urlOrID) {
    setMusicRequest([byURL, urlOrID])
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

  /* ------------------------------ Dark Mode ------------------------------ */
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  function toggleDarkMode(enabled) {
    setDarkModeEnabled(enabled);
    localStorage.setItem("darkModeEnabled", enabled); // queried in SideBarItem.jsx
  }
  /* ------------------------------ Dark Mode ------------------------------ */

  return (
    <div>
      {/* <div>session is : {sessionData}</div> */}
      <BrowserRouter>
        <Header sessionData={sessionData} logout={logout} toggleDarkMode={toggleDarkMode} darkModeEnabled={darkModeEnabled} />
        <Routes>
          <Route path="/" element={<Home setSessionData={setSessionData} firstLoad={firstLoad} darkModeEnabled={darkModeEnabled} fetchAudio={fetchAudio} />} />
          <Route path="/allComposers" element={<AllComposers darkModeEnabled={darkModeEnabled} />} />
          <Route path="/allWorks" element={<AllWorks darkModeEnabled={darkModeEnabled} fetchAudio={fetchAudio} />} />
          <Route path="/viewComposer" element={<ViewComposer darkModeEnabled={darkModeEnabled} />} />
          <Route path="/viewWorks" element={<ViewWorks fetchAudio={fetchAudio} darkModeEnabled={darkModeEnabled} />} />

          <Route path="/map" element={<Map darkModeEnabled={darkModeEnabled} />} />
          <Route path="/about" element={<About darkModeEnabled={darkModeEnabled} />} />

          {/* Trivia Routes */}
          <Route path="/trivia" element={<Trivia darkModeEnabled={darkModeEnabled} />} />
          <Route path="/trivia/quiz" element={<TriviaQuiz darkModeEnabled={darkModeEnabled} />} />

          {/* Profile Routes */}
          <Route path="/signIn" element={<SignIn setSessionData={setSessionData} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile" element={<Profile sessionData={sessionData} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists" element={<Playlists sessionData={sessionData} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists/newPlaylist" element={<NewPlaylist sessionData={sessionData} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists/editPlaylist" element={<EditPlaylist sessionData={sessionData} darkModeEnabled={darkModeEnabled} />} />

        </Routes>
      </BrowserRouter>

      <MusicPlayer musicRequest={musicRequest} darkModeEnabled={darkModeEnabled} />

      <div>
        <Toaster position="top-left" reverseOrder={false}
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
