import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./pages/Ranking";
import About from "./pages/About";

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/about" element={<About />} />
        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
