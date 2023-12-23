import React from "react";

const PlayerLine = ({ index, player, rankingType }) => {
  return (
    <li className="playerLine">
      <div className="infos">
        <div className="index">
          <h2>{index+1}</h2>
        </div>
        <div className="name">
          <h2>{player.name}</h2>
        </div>
        <div className={rankingType}>
          <h2>{player[rankingType]}</h2>
        </div>
      </div>
    </li>
  );
};

export default PlayerLine;
