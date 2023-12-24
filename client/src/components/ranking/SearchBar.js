import React, { useEffect, useState } from "react";

const SearchBar = ({playerName,setPlayerName,onInputChange}) => {
    const handleInputChange = (e) => {
        setPlayerName(e.target.value);
        if (onInputChange) {
            onInputChange(e.target.value);
        }
    };

    return (
        <div className="searchBar">
            <input 
                type="text"
                placeholder="PlayerName" 
                value={playerName} 
                onChange={handleInputChange}>
            </input>
        </div>
    );
};

export default SearchBar;
