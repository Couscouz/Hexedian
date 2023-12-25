import React from 'react';
import SearchBar from './SearchBar';

const FilterBar = ({rankingType,setRankingType,onFilterChange}) => {
    
    const handleFilterClick = (filter) => {
        onFilterChange(filter);
        setRankingType(filter);
    };

    return (
        <div className="filterBar">
            <SearchBar />
            <button className={`filterBtn ${rankingType === 'recent' ? 'selected' : ''}`}
                    onClick={() => handleFilterClick("recent")}>Recent</button>
            <button className={`filterBtn ${rankingType === 'overall' ? 'selected' : ''}`}
                onClick={() => handleFilterClick("overall")}>Overall</button>
            <button className={`filterBtn ${rankingType === 'moe' ? 'selected' : ''}`}
                onClick={() => handleFilterClick("moe")}>MOE</button>
        </div>
    );
};

export default FilterBar;
