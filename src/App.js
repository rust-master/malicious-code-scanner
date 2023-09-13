import React, { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";
import UploadForm from "./UploadForm";
import SearchResults from "./SearchResults";
import JSZip from "jszip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ResponsiveAppBar from "./AppBar";
import { motion } from "framer-motion";

function App() {
  const [results, setResults] = useState([]);
  const [progressBar, setProgressBar] = useState(false);

  const handleUpload = (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        setProgressBar(true);

        const buffer = event.target.result;
        const zip = await JSZip.loadAsync(buffer);

        const searchResults = [];

        await Promise.all(
          Object.keys(zip.files).map(async (filename) => {
            const fileData = await zip.files[filename].async("string");
            if (fileData.includes("YWNjZXNzU3luYw")) {
              searchResults.push(filename);
            } else if (fileData.includes("JQYJXhwYAw")) {
              searchResults.push(filename);
            } else if (fileData.includes("FgYDWQERNF0UEDVMBxEHVQ")) {
              searchResults.push(filename);
            } else if (fileData.includes("bmtiaWhmYmVvZ2FlYW9laGxlZm5rb2RiZWZncGdrbm4")) {
              searchResults.push(filename);
            } else if (fileData.includes("Gx8EUR0SBF0aEwddFBsDUBkRAFYeGwJaEBIBSBIfCFY")) {
              searchResults.push(filename);
            } else if (fileData.includes("51476596") && fileData.includes("Object.prototype.hasOwnProperty")) {
              searchResults.push(filename);
            }
          })
        );

        if (searchResults.length === 0) {
          searchResults.push("No Malicious Code Found");
          setResults(searchResults);
        }

        setResults(searchResults);

        setProgressBar(false);
      } catch (e) {
        alert(e);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      style={{
        overflow: "hidden !important",
        backgroundColor:
          results.length === 0 ? "white" : results[0] === "No Malicious Code Found" ? "#3cbe4b" : "#f10e43",
      }}
    >
      <ResponsiveAppBar />
      <div className="App">
        {/* <motion.div 
        animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}> */}
        <Card className="CardDiv" sx={{ marginTop: 5, minWidth: 275, boxShadow: "5px 5px 6px 4px #1A76D2" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 24, fontFamily: "Be Vietnam Pro", fontWeight: 600 }}
              color="#1A76D2"
              gutterBottom
            >
              Malicious Code Scanner
            </Typography>

            <Typography variant="body2">{"Upload the Zip File of Project"}</Typography>
          </CardContent>

          <UploadForm handleUpload={handleUpload} />

          <SearchResults results={results} />

          <LinearProgress color="success" style={{ display: progressBar === false ? "none" : "block" }} />
        </Card>
        {/* </motion.div> */}
      </div>
      <p>
        Made by{" "}
        <a style={{ color: "#1A76D2" }} href="https://github.com/rust-master" target="_blank" rel="noreferrer">
          Rust Master ❤️{" "}
        </a>
      </p>
      <Analytics />
    </div>
  );
}

export default App;
