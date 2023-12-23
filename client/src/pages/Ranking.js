import React from "react";
import Logo from "../components/Logo";
import WarningBar from "../components/WarningBar";
import PlayerLine from "../components/ranking/PlayerLine";

const Ranking = () => {
  const players = [
    {name: "Hexedian", recent: 5000, moe: 150},
    {name: "Tomato", recent: 2000, moe: 20}
  ]

  return (
    
    <div>
      <WarningBar />
      <Logo />
      <ul>
        {players.map((player,index) => (
          <PlayerLine key={index} player={player}/>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
