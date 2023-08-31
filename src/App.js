import React, { useState } from "react";
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

import { pageVariants, pageTransition } from "./utils/FramerAnimation.ts";

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
        backgroundColor:
          results.length === 0 ? "white" : results[0] === "No Malicious Code Found" ? "#3cbe4b" : "#f10e43",
      }}
    >
      <ResponsiveAppBar />
      <div className="App">
        <motion.div initial="init" animate="anim" exit="last" variants={pageVariants} transition={pageTransition}>
          <Card sx={{ marginTop: 5, minWidth: 275, boxShadow: "5px 5px 6px 4px #1A76D2" }}>
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
        </motion.div>
      </div>
      <p>
        Made by{" "}
        <a style={{ color: "#1A76D2" }} href="https://github.com/rust-master" target="_blank" rel="noreferrer">
          Rust Master ❤️{" "}
        </a>
      </p>
    </div>
  );
}

export default App;
