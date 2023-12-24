import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerLine from "./PlayerLine";
import LoadingSpinner from "../LoadingSpinner";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";

const API_URL = "http://localhost:8080";

const Players = () => {

    const [playerName, setPlayerName] = useState("");

    const [filter, setFilter] = useState({});
    
    const [players, setPlayers] = useState([]);


    const [isLoading, setIsLoading] = useState(false);

    const [rankingType, setRankingType] = useState("moe");//recent-overall-moe
    const [size, setSize] = useState(50);

    const handleSearchInputChange = (inputValue) => {
        // Vous pouvez faire quelque chose avec la valeur saisie ici
        console.log("Input value changed:", inputValue);
      };

    useEffect(() => {
        setIsLoading(true);
        axios.get(API_URL+"/players/sort/"+rankingType).then(res => {
            setPlayers(res.data);
            setIsLoading(false);
        });
    },[]);

    return (    
        <div>
            <SearchBar playerName={playerName} setPlayerName={setPlayerName} onInputChange={handleSearchInputChange}/>
            <FilterBar />
            <h1>===={playerName}</h1>
            <ul>
                {players.map((player,index) => (
                    <PlayerLine index={index} player={player} rankingType={rankingType}/>
                ))}
            </ul>
        </div>
    );
};

export default Players;
