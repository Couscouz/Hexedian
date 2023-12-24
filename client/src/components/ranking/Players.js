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

    const [playersToPrint, setPlayersToPrint] = useState(players);


    const [isLoading, setIsLoading] = useState(false);

    const [rankingType, setRankingType] = useState("overall");//recent-overall-moe
    const [size, setSize] = useState(100);

    const onFilterChange = async (filter) => {
        setRankingType(filter);
    }   

    useEffect(() => {
        axios.get(API_URL+"/players/sort/"+rankingType+"/top/"+size).then(res => {
            setPlayers(res.data);
        });
    }, [rankingType])

    useEffect(() => {
        // setIsLoading(true);
        // axios.get(API_URL+"/players/sort/"+rankingType+"/top/"+size).then(res => {
        //     setPlayers(res.data);
        //     setIsLoading(false);
        // });
        
    },[]);

    return (    
        <div>
            <SearchBar playerName={playerName} setPlayerName={setPlayerName}/>
            <FilterBar rankingType={rankingType} setRankingType={setRankingType} onFilterChange={onFilterChange}/>
            <h1>=={playerName}-{rankingType}</h1>
            <ul>
                {playerName === "" ? 
                    (
                    players.map((player,index) => (
                        <PlayerLine index={index} player={player} rankingType={rankingType}/>
                    ))
                    ) 
                    : 
                    (
                    players.map((player, index) => ({ originalIndex: index, player }))
                        .filter(item => item.player.name.includes(playerName))
                        .map((filteredPlayer, index) => (
                            <PlayerLine 
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
