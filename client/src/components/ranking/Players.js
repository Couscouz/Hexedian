import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerLine from "./PlayerLine";

const API_URL = "http://localhost:8080";

const Players = () => {
    
    const [players, setPlayers] = useState([]);
    const [size, setSize] = useState(5);

    const [rankingType, setRankingType] = useState("recent");//recent-overall-moe

    useEffect(() => {
        axios.get(API_URL+"/players/sort/moe").then(res => setPlayers(res.data))
    },[]);

    return (

        <div>
        <ul>
            {players.map((player,index) => (
                <PlayerLine index={index} player={player} rankingType={rankingType}/>
            ))}
        </ul>
        </div>
    );
};

export default Players;
