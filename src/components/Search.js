import React from 'react';
import './Search.css';

const Search = ({ handleSearchChange }) => {
	return (
		<div className="search">
			<p>Search:</p>
			<input type="search" onChange={handleSearchChange}/>
		</div>
	);
}

export default Search;
