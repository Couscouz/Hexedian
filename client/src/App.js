import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./pages/Ranking";
import About from "./pages/About";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/about" element={<About />} />
        <Route path="/report" element={<Report />} />
        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
