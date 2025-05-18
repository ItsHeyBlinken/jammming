import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search for a song or artist" 
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export default SearchBar;
