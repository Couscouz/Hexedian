import React from "react";
import PlayerLine from "./PlayerLine";

const Players = () => {
  const players = [
    {name: "Hexedian", recent: 5000, moe: 150},
    {name: "Tomato", recent: 2000, moe: 20}
  ]

  return (
    <div>
      <ul>
        {players.map((player,index) => (
          <PlayerLine key={index} player={player}/>
        ))}
      </ul>
    </div>
  );
};

export default Players;
