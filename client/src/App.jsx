import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/navigation/Header";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import AllComposers from "./pages/AllComposers";
import AllWorks from "./pages/AllWorks";
import ViewComposer from "./pages/ViewComposer";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import DockedMusicPlayer from "./components/dockedMusicPlayer/DockedMusicPlayer";
import ViewWorks from "./pages/ViewWorks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Playlists from "./pages/Playlists";
import NewPlaylist from "./components/playlists/NewPlaylist/NewPlaylist";
import EditPlaylist from "./components/playlists/Playlists/EditPlaylist";
import Profile from "./pages/Profile";
import Trivia from "./pages/Trivia";
import TriviaQuiz from "./components/trivia/TriviaQuiz";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { logout, setSession } from "./sessionHandler";

function App() {

  /* -------------------------------- User Session -------------------------------- */
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  function handleLogout(message) {
    logout(message, setAccessToken, setRefreshToken, setUsername, setEmail, setRememberMe, setIsGoogleAuth);
  }
  useEffect(() => {
    setSession(accessToken, refreshToken, email, username, rememberMe, setAccessToken, setRefreshToken, setUsername, setEmail);
  }, [accessToken, refreshToken, email, username, rememberMe]);
  /* -------------------------------- User Session -------------------------------- */

  /* -------------------------------- Music Player -------------------------------- */
  const [musicRequest, setMusicRequest] = useState(null);
  const [audioObject, setAudioObject] = useState(null);
  const [currentSong, setCurrentSong] = useState({ title: "", composerName: "", portrait: "" });
  const [anotherRequest, setAnotherRequest] = useState(false); // did another request come in, or just closing music player
  const [playlistQueueIndex, setPlaylistQueueIndex] = useState(0);
  const [queueLength, setQueueLength] = useState(0);
  const [playerDocked, setPlayerDocked] = useState(localStorage.getItem("playerDocked") === "true" || true);
  function fetchAudio(byURL, urlOrID) {
    setPlaylistQueueIndex(0);
    setMusicRequest([byURL, urlOrID]);
  }
  function togglePlayerType(isDocked) {
    setPlayerDocked(isDocked);
    localStorage.setItem("playerDocked", isDocked);
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

  /* --------------------------------- Dark Mode --------------------------------- */
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  function toggleDarkMode(enabled) {
    setDarkModeEnabled(enabled);
    localStorage.setItem("darkModeEnabled", enabled); // queried in SideBarItem.jsx
  }
  /* --------------------------------- Dark Mode --------------------------------- */

  return (
    <div>
      <BrowserRouter>
        <Header accessToken={accessToken} username={username} logout={handleLogout} toggleDarkMode={toggleDarkMode} darkModeEnabled={darkModeEnabled} />
        <Routes>
          {/* Nav Bar Routes */}
          <Route path="/" element={<Home firstLoad={firstLoad} darkModeEnabled={darkModeEnabled} fetchAudio={fetchAudio} audioObject={audioObject} setAnotherRequest={setAnotherRequest} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setUsername={setUsername} setEmail={setEmail} setIsGoogleAuth={setIsGoogleAuth} />} />
          <Route path="/allComposers" element={<AllComposers darkModeEnabled={darkModeEnabled} />} />
          <Route path="/allWorks" element={<AllWorks darkModeEnabled={darkModeEnabled} fetchAudio={fetchAudio} audioObject={audioObject} setAnotherRequest={setAnotherRequest} />} />
          <Route path="/viewComposer" element={<ViewComposer darkModeEnabled={darkModeEnabled} />} />
          <Route path="/viewWorks" element={<ViewWorks darkModeEnabled={darkModeEnabled} fetchAudio={fetchAudio} audioObject={audioObject} setAnotherRequest={setAnotherRequest} />} />
          <Route path="/map" element={<Map darkModeEnabled={darkModeEnabled} />} />
          <Route path="/about" element={<About darkModeEnabled={darkModeEnabled} />} />

          {/* Trivia Routes */}
          <Route path="/trivia" element={<Trivia darkModeEnabled={darkModeEnabled} />} />
          <Route path="/trivia/quiz" element={<TriviaQuiz darkModeEnabled={darkModeEnabled} />} />

          {/* Profile Routes */}
          <Route path="/signIn" element={<SignIn setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} setUsername={setUsername} setEmail={setEmail} rememberMe={rememberMe} setRememberMe={setRememberMe} setIsGoogleAuth={setIsGoogleAuth} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/signUp" element={<SignUp darkModeEnabled={darkModeEnabled} />} />
          <Route path="/forgotPassword" element={<ForgotPassword darkModeEnabled={darkModeEnabled} />} />
          <Route path="/forgotPassword/reset" element={<ResetPassword setAccessToken={setAccessToken} accessToken={accessToken} setRefreshToken={setRefreshToken} refreshToken={refreshToken} setUsername={setUsername} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile" element={<Profile username={username} accessToken={accessToken} refreshToken={refreshToken} email={email} isGoogleAuth={isGoogleAuth} logout={handleLogout} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists" element={<Playlists accessToken={accessToken} fetchAudio={fetchAudio} audioObject={audioObject} setAnotherRequest={setAnotherRequest} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists/newPlaylist" element={<NewPlaylist accessToken={accessToken} darkModeEnabled={darkModeEnabled} />} />
          <Route path="/profile/playlists/editPlaylist" element={<EditPlaylist accessToken={accessToken} darkModeEnabled={darkModeEnabled} />} />
        </Routes>
      </BrowserRouter>

      {/* <MusicPlayer musicRequest={musicRequest} audioObject={audioObject} setAudioObject={setAudioObject} currentSong={currentSong} setCurrentSong={setCurrentSong} anotherRequest={anotherRequest} playlistQueueIndex={playlistQueueIndex} setPlaylistQueueIndex={setPlaylistQueueIndex} queueLength={queueLength} setQueueLength={setQueueLength} togglePlayerType={togglePlayerType} playerDocked={playerDocked} darkModeEnabled={darkModeEnabled} /> */}
      <DockedMusicPlayer musicRequest={musicRequest} audioObject={audioObject} setAudioObject={setAudioObject} currentSong={currentSong} setCurrentSong={setCurrentSong} anotherRequest={anotherRequest} playlistQueueIndex={playlistQueueIndex} setPlaylistQueueIndex={setPlaylistQueueIndex} queueLength={queueLength} setQueueLength={setQueueLength} togglePlayerType={togglePlayerType} playerDocked={playerDocked} darkModeEnabled={darkModeEnabled} />
      <div>
        <Toaster position="top-left" reverseOrder={false} containerStyle={{ position: "absolute", top: 80, left: 80, bottom: 20, right: 20, }} />
      </div>
    </div>
  );
}

export default App;
