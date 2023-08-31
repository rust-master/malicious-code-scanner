import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h3 style={{fontFamily: "Be Vietnam Pro"}}>Scan Results:</h3>
      <ul>
        {results.map((result, index) => (
          <li style={{listStyle: "none", fontFamily: "Be Vietnam Pro"}} key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
