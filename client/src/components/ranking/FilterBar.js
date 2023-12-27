import React from 'react';

const FilterBar = ({rankingType,setRankingType,onFilterChange}) => {
    
    const handleFilterClick = (filter) => {
        onFilterChange(filter);
        setRankingType(filter);
    };

    return (
        <div className="filterBar">
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
