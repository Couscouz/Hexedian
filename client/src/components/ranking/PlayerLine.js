import React from "react";

const PlayerLine = ({ player }) => {
  return (
    <li className="playerLine">
      <div className="infos">
        <h2>{player.name}</h2>
        <h2>{player.recent}</h2>
        <h2>{player.moe}</h2>
      </div>
    </li>
  );
};

export default PlayerLine;
