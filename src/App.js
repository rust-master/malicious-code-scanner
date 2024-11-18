import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import UploadForm from "./UploadForm";
import SearchResults from "./SearchResults";
import JSZip from "jszip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ResponsiveAppBar from "./AppBar";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [results, setResults] = useState([]);
  const [progressBar, setProgressBar] = useState(false);
  const [isNewFile, setIsNewFile] = useState(false);
  const [githubURL, setGithubURL] = useState(""); // Track GitHub URL input

  const fileInputRef = React.createRef();
  const searchResults = [];


  React.useEffect(() => {
    setResults([])
  }, [githubURL]);


  const handleUpload = (file) => {
    setIsNewFile(true); // Indicate a new file has been selected
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        setProgressBar(true);
        const buffer = event.target.result;
        const zip = await JSZip.loadAsync(buffer);



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
            } else if (fileData.includes("setInterval") && fileData.includes("6e5") && fileData.includes("Object.defineProperty")) {
              searchResults.push(filename);
            } else if (fileData.includes("python3") && fileData.includes("Login") && fileData.includes("BraveSoftw") && fileData.includes("Google") && fileData.includes("clearInterval(_0x558feb)")) {
              searchResults.push(filename);
            } else if (fileData.includes("existsSync") && fileData.includes("fhbohimael") && fileData.includes("Local/Goog") && fileData.includes("Library")) {
              searchResults.push(filename);
            } else if (
              fileData.includes("{(st+=1)<5?ht():clearInterval(ot)}),6e5);") &&
              fileData.includes("QnJhdmVTb2Z0d2FyZS9CcmF2ZS1Ccm93c2Vy")
            ) {
              searchResults.push(filename);
            } else if (
              fileData.includes("'/id.j'") &&
              fileData.includes("'son'") &&
              fileData.includes("'solan'") &&
              fileData.includes("'Local'") &&
              fileData.includes("'/Logi'")
            ) {
              searchResults.push(filename);
            } else if (
              fileData.includes("0x927c0") &&
              fileData.includes("setInterval") &&
              fileData.includes("ZXhpc3RzU3")
            ) {
              searchResults.push(filename);
            } else if (
              fileData.includes("substring") &&
              fileData.includes("My4xMTUuMj") &&
              fileData.includes("fromCharCo") &&
              fileData.includes("base64")
            ) {
              searchResults.push(filename);
            }
          })
        );

        setIsNewFile(false); // Reset the new file state

        if (searchResults.length === 0) {
          searchResults.push("No Malicious Code Found");
        }

        setResults(searchResults);
        if (searchResults[0] === "No Malicious Code Found") {
          toast.success("No Malicious Code Found", {
          });
          console.log("No Malicious Code Found")
        } else {
          toast.error(`Malicious Code Found -> ${searchResults[0]}`, {
          });
        }
        setProgressBar(false);
      } catch (e) {
        alert(e);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDownload = async () => {
    try {
      // Ensure the URL is valid
      const url = new URL(githubURL); // Replace 'githubURL' with the input field or variable storing the URL.

      if (!url.protocol.startsWith("https:")) {
        alert("Invalid URL. Please enter a valid HTTPS URL");
        throw new Error("Invalid URL. Please enter a valid HTTPS URL.");
      }

      // Check the host to determine the service
      const host = url.hostname.toLowerCase();

      if (host.includes("github.com")) {
        await handleGitHubDownload();
      } else if (host.includes("bitbucket.org")) {
        await handleBitbucketDownload();
      } else {
        alert("Unsupported URL. Please provide a GitHub or Bitbucket URL.");
        throw new Error("Unsupported URL. Please provide a GitHub or Bitbucket URL.");
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const handleGitHubDownload = async () => {
    try {

      // validate the github URL
      const url = new URL(githubURL);

      if (!url.protocol.startsWith("https:")) {
        alert("Invalid GitHub URL. Please enter a valid HTTPS URL")
        throw new Error("Invalid GitHub URL. Please enter a valid HTTPS URL.");
      }

      if (githubURL) {

        setProgressBar(true);
        setIsNewFile(true);


        const url = new URL(githubURL);
        const repo = url.pathname.replace(/^\//, "").replace(/\/$/, "");
        const apiUrl = `https://api.github.com/repos/${repo}/branches`;

        const apiResponse = await axios.get(apiUrl);
        console.log("🚀 ~ handleGitHubDownload ~ apiResponse:", apiResponse);
        const branches = apiResponse.data.map(branch => branch.name);
        console.log('Branches:', branches);
        console.log('Branches:', branches[0]);

        for (const branch of branches) {
          console.log("🚀 ~ handleGitHubDownload ~ branch:", branch);
          const codeloadUrl = `https://codeload.github.com/${repo}/zip/refs/heads/${branch}`;
          // const url = `https://codeload.github.com/tomracanelli1/Dapp-project/zip/refs/heads/main`;
          const proxyURL = `https://corsproxy.io/?${encodeURIComponent(codeloadUrl)}`;

          const response = await fetch(proxyURL);

          if (!response.ok) {
            throw new Error("Failed to download the GitHub project.");
          }

          const blob = await response.blob();
          console.log("🚀 ~ handleGitHubDownload ~ blob:", blob);
          handleUpload(blob); // Process the file with handleUpload
        }

      } else {
        alert("Please enter a valid GitHub URL");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setProgressBar(false);
    }
  };

  const handleBitbucketDownload = async () => {
    try {
      // Validate the Bitbucket URL
      const url = new URL(githubURL);

      if (!url.protocol.startsWith("https:")) {
        alert("Invalid Bitbucket URL. Please enter a valid HTTPS URL");
        throw new Error("Invalid Bitbucket URL. Please enter a valid HTTPS URL.");
      }

      if (githubURL) {
        setProgressBar(true);
        setIsNewFile(true);

        // Extract repository owner and name from the URL
        const repoPath = url.pathname.replace(/^\//, "").replace(/\/$/, "");
        console.log("repoPath:", repoPath);
        const [workspace, repo] = repoPath.split("/");
        // Extract repository branch from the URL

        const branch = repoPath.split("/").pop() || "main"; // Default to "main" if no branch is present
        console.log("🚀 ~ handleBitbucketDownload ~ branch:", branch);



        if (!workspace || !repo) {
          throw new Error("Invalid Bitbucket repository URL format.");
        }

        // Construct the archive download URL
        const downloadUrl = `https://bitbucket.org/${workspace}/${repo}/get/${branch}.zip`;
        const proxyURL = `https://corsproxy.io/?${encodeURIComponent(downloadUrl)}`;

        const response = await fetch(proxyURL);

        if (!response.ok) {
          throw new Error("Failed to download the Bitbucket repository.");
        }

        const blob = await response.blob();
        console.log("🚀 ~ handleBitbucketDownload ~ blob:", blob);
        handleUpload(blob); // Process the file with handleUpload
      } else {
        alert("Please enter a valid Bitbucket URL");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setProgressBar(false);
    }
  };

  const backgroundColor = isNewFile
    ? "black"
    : results.length === 0
      ? "#343642"
      : results[0] === "No Malicious Code Found"
        ? "#3cbe4b"
        : "#f10e43";

  return (
    <div
    className="main"
    style={{
      overflow: "hidden",
      backgroundColor: backgroundColor,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <ResponsiveAppBar />
    <div className="App" style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <ToastContainer />
      <Card
        className="CardDiv"
        sx={{
          marginTop: 5,
          marginBottom: 5,
          padding: "20px",
          boxShadow: "10 18px 26px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            style={{
              color: "#1A76D2",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "Be Vietnam Pro, Arial, sans-serif",
              lineHeight: "1.6",
            }}
          >
            Upload the Zip File of a Project or Enter a GitHub/Bitbucket Project URL
          </Typography>
        </CardContent>
  
        {/* Input Section */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder="Enter GitHub or Bitbucket Project URL"
            style={{
              width: "97%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          />
          <button
            onClick={handleDownload}
            style={{
              width: "100%",
              backgroundColor: "#1A76D2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Download and Scan
          </button>
        </div>
  
        {/* Divider */}
        <Typography
          variant="body2"
          style={{
            textAlign: "center",
            margin: "20px 0",
            color: "#666",
            fontFamily: "Arial, sans-serif",
          }}
        >
          OR
        </Typography>
  
        {/* File Upload Section */}
        <UploadForm
          handleUpload={handleUpload}
          fileInputRef={fileInputRef}
          setGithubURL={setGithubURL}
          githubURL={githubURL}
          setResults={setResults}
          results={results}
        />
  
        {/* Scan Results Section */}
        <SearchResults results={results} />
  
        {/* Progress Bar */}
        <LinearProgress
          color="success"
          sx={{
            display: progressBar === false ? "none" : "block",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        />
      </Card>
    </div>
  
    {/* Footer */}
    <footer style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}>
    Developed by{" "}
      <a
        style={{ color: "#1A76D2", textDecoration: "none"}}
        href="https://github.com/rust-master"
        target="_blank"
        rel="noreferrer"
      >
        Rust Master ❤️
      </a>
    </footer>
    <Analytics />
  </div>
  
  );
}

export default App;
