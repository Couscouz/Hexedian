import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerLine from "./PlayerLine";

const API_URL = "localhost:3000/"

const Players = () => {
    
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get(API_URL+"players/sort/recent/top/5")
    },[]);
    
    const aplayers = [
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
