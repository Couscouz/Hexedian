import React from "react";

const SearchBar = ({playerName,setPlayerName}) => {
    return (
        <div className="searchBar">
            <input 
                type="text"
                placeholder="PlayerName" 
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)}>
            </input>
        </div>
    );
};

export default SearchBar;
