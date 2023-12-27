import React, { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import PlayerLine from "./PlayerLine";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import Logo from "../Logo";

const API_URL = "http://localhost:8080";

const Players = () => {

    const [playerName, setPlayerName] = useState("");

    const [filter, setFilter] = useState({});
    
    const [players, setPlayers] = useState([]);

    const [playersToPrint, setPlayersToPrint] = useState(players);


    const [loading, setLoading] = useState(false);

    const [rankingType, setRankingType] = useState("recent");//recent-overall-moe
    const [size, setSize] = useState(1000);

    const onFilterChange = async (newType) => {
        setPlayers([]);
        setLoading(true);
        axios.get(API_URL+"/players/sort/"+newType+"/top/"+size).then(res => {
            setPlayers(res.data);
            setRankingType(newType);
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL+"/players/sort/"+rankingType+"/top/"+size).then(res => {
            setPlayers(res.data);
            setLoading(false);
        });
    },[]);

    return (    
        <div>
            <div className="barLoader">
            {loading && <BarLoader color={'#000000'} loading={loading} height={20} width={200} />}
            </div>
            <Logo />
            {/* <SearchBar playerName={playerName} setPlayerName={setPlayerName}/> */}
            <FilterBar rankingType={rankingType} setRankingType={setRankingType} onFilterChange={onFilterChange}/>
            <ul>
                {playerName === "" ? 
                    (
                    players.map((player,index) => (
                        <PlayerLine key={index} index={index} player={player} rankingType={rankingType}/>
                    ))
                    ) 
                    : 
                    (
                    players.map((player, index) => ({ originalIndex: index, player }))
                        .filter(item => item.player.name.includes(playerName))
                        .map((filteredPlayer, index) => (
                            <PlayerLine 
                                key={index}
                                index={filteredPlayer.originalIndex}
                                player={filteredPlayer.player}
                                rankingType={rankingType}
                            />
                    ))
                    )
                }
            </ul>
        </div>
    );
};

export default Players;
