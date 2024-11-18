import React from 'react';
import Typography from "@mui/material/Typography";

const SearchResults = ({ results }) => {
  return (
<div style={{ marginTop: "30px" }}>
  <Typography
    variant="h6"
    sx={{
      fontFamily: "Be Vietnam Pro, Arial, sans-serif",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center",
      color: "#1A76D2",
    }}
  >
    Scan Results
  </Typography>
  <ul style={{ padding: "0", margin: "0", listStyle: "none", textAlign: "center" }}>
    {results.map((result, index) => (
      <li
        key={index}
        style={{
          fontFamily: "Be Vietnam Pro, Arial, sans-serif",
          fontSize: "14px",
          color: "#444",
          marginBottom: "5px",
        }}
      >
        {result}
      </li>
    ))}
  </ul>
</div>
  );
};

export default SearchResults;
