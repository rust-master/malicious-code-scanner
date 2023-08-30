import React, { useEffect, useState } from "react";
import "./App.css";
import UploadForm from "./UploadForm";
import SearchResults from "./SearchResults";
import JSZip from "jszip";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [results, setResults] = useState([]);

  const handleUpload = (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const buffer = event.target.result;
      const zip = await JSZip.loadAsync(buffer);

      const searchResults = [];

      await Promise.all(
        Object.keys(zip.files).map(async (filename) => {
          const fileData = await zip.files[filename].async("string");
          if (fileData.includes("YWNjZXNzU3luYw")) {
            searchResults.push(filename);
          }
        })
      );

      if (searchResults.length === 0) {
        searchResults.push("No Malicious Code Found")
        setResults(searchResults);
      }

      setResults(searchResults);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App" style={{ backgroundColor: results.length === 0 ? "white" : results[0] === "No Malicious Code Found" ? "green" : "red" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Malicious Code Scanner
          </Typography>
          <Typography variant="h5" component="div">
            {/* be{bull}nev{bull}o{bull}lent */}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* adjective */}
          </Typography>
          <Typography variant="body2">{"Upload the Zip File of Project"}</Typography>
        </CardContent>
        <CardActions>
          <div>
            <Button size="small">
              {" "}
              <UploadForm handleUpload={handleUpload} />
            </Button>
          </div>
        </CardActions>
        <SearchResults results={results} />
      </Card>
    </div>
  );
}

export default App;
