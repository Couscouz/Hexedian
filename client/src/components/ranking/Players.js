import React, { useEffect, useRef, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import PlayerLine from "./PlayerLine";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import Logo from "../Logo";

const Players = () => {
    console.log("here");

    const [playerName, setPlayerName] = useState("");
    
    const [players, setPlayers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [rankingType, setRankingType] = useState("recent");//recent-overall-moe
    const [section, setSection] = useState(0); //sec 1 => 0-100;

    const sectionSize = 100;
    const loader = useRef(null);

    const loadMore = async () => {
        setLoading(true);
        console.log("players.l="+players.length);
        await axios.get(`http://localhost:8080/players?sort=${rankingType}&section=${section+1}&limit=${sectionSize}`).then(res => {
            setPlayers(prev => [...prev, ...res.data]);
        })
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadMore();
    }, [section]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading) {
                setSection(prev => prev+1);
            }
        }, { threshold: 1.0 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (observer.current) {
                observer.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        setSection(0);
        setPlayers([]);
    }, [rankingType]);

    return (    
        <div>
            {/* <div className="barLoader">
            {loading && <BarLoader color={'#000000'} loading={loading} height={20} width={200} />}
            </div>             */}
            <Logo />
            <SearchBar playerName={playerName} setPlayerName={setPlayerName}/>
            <FilterBar rankingType={rankingType} setRankingType={setRankingType} setPlayers={setPlayers}/>
            <ul>
                {playerName.length < 3 ? 
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
            <div ref={loader}></div>
        </div>
    );
};

export default Players;
