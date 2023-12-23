import React from "react";
import Logo from "../components/Logo";
import WarningBar from "../components/WarningBar";
import Players from "../components/ranking/Players";

const Ranking = () => {
  return (
    <div>
      <WarningBar />
      <Logo />
      <Players />
    </div>
  );
};

export default Ranking;
