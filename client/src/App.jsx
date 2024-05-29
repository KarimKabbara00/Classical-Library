import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components//Footer";
import Home from "./pages/Home"
import About from "./pages/About"
import SearchResults from "./pages/SearchResults"
import ViewComposer from "./pages/ViewComposer"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewWorks from "./pages/ViewWorks";

function App() {
  
  // this state is passed across all components! // UNDO THIS!
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults loading={loading} setLoading={setLoading} />}  />
          <Route path="/viewComposer" element={<ViewComposer />}/>
          <Route path="/viewWorks" element={<ViewWorks />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
