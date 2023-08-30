import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {results.map((result, index) => (
          <li style={{listStyle: "none"}} key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
