import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerLine from "./PlayerLine";
import LoadingSpinner from "../LoadingSpinner";

const API_URL = "http://localhost:8080";

const Players = () => {

    const [filter, setFilter] = useState({});
    
    const [players, setPlayers] = useState([]);


    const [isLoading, setIsLoading] = useState(false);

    const [rankingType, setRankingType] = useState("moe");//recent-overall-moe
    const [size, setSize] = useState(50);

    useEffect(() => {
        setIsLoading(true);
        axios.get(API_URL+"/players/sort/"+rankingType).then(res => {
            setPlayers(res.data);
            setIsLoading(false);
        });
    },[]);

    return (    

        <div>
            {isLoading ? <LoadingSpinner /> : <LoadingSpinner />}
        <ul>
            {players.map((player,index) => (
                <PlayerLine index={index} player={player} rankingType={rankingType}/>
            ))}
        </ul>
        </div>
    );
};

export default Players;
