import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import UploadForm from "./UploadForm";
import SearchResults from "./SearchResults";
import JSZip from "jszip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ResponsiveAppBar from "./AppBar";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Box, TextField, Button, Divider } from "@mui/material";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [results, setResults] = useState([]);
  const [progressBar, setProgressBar] = useState(false);
  const [isNewFile, setIsNewFile] = useState(false);
  const [githubURL, setGithubURL] = useState(""); // Track GitHub URL input
  const [scanCommits, setScanCommits] = useState(false);

  const fileInputRef = React.createRef();
  const searchResults = [];


  React.useEffect(() => {
    setResults([])
  }, [githubURL]);

  const handleCheckboxChange = (event) => {
    setScanCommits(event.target.checked);
    console.log("Scan GitHub Commits:", event.target.checked);
  };

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
        setProgressBar(false);
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
      } else if (host.includes("gitlab") && host.includes(".com")) {
        await handleGitLabDownload();
      } else {
        alert("Unsupported URL. Please provide a GitHub, GitLab or Bitbucket URL.");
        throw new Error("Unsupported URL. Please provide a GitHub, GitLab or Bitbucket URL.");
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

          if (scanCommits) {
            handleGitHubDownloadCommitsZip()
          }
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

  const handleGitHubDownloadCommitsZip = async () => {
    try {
      // Validate the GitHub URL
      const url = new URL(githubURL);

      if (!url.protocol.startsWith("https:")) {
        alert("Invalid GitHub URL. Please enter a valid HTTPS URL.");
        throw new Error("Invalid GitHub URL. Please enter a valid HTTPS URL.");
      }

      if (githubURL) {
        setProgressBar(true);
        setIsNewFile(true);

        const repo = url.pathname.replace(/^\//, "").replace(/\/$/, "");
        const apiCommitsUrl = `https://api.github.com/repos/${repo}/commits`;

        const commitsResponse = await axios.get(apiCommitsUrl);
        console.log("🚀 ~ handleGitHubDownloadCommitsZip ~ commitsResponse:", commitsResponse);

        const commits = commitsResponse.data.map(commit => commit.sha);
        console.log("Commits:", commits);

        for (const commit of commits) {
          console.log("🚀 ~ handleGitHubDownloadCommitsZip ~ commit:", commit);
          // Request ZIP archive for each commit
          const codeloadUrl = `https://codeload.github.com/${repo}/zip/${commit}`;
          const proxyURL = `https://corsproxy.io/?${encodeURIComponent(codeloadUrl)}`;

          const response = await fetch(proxyURL);

          if (!response.ok) {
            throw new Error(`Failed to download commit ${commit} of the GitHub project.`);
          }

          const blob = await response.blob();
          console.log("🚀 ~ handleGitHubDownloadCommitsZip ~ blob:", blob);
          await handleUpload(blob); // Process the file with handleUpload
        }
      } else {
        alert("Please enter a valid GitHub URL.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setProgressBar(false);
    }
  };


  const handleGitLabDownload = async () => {
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
        console.log("🚀 ~ handleGitLabDownload ~ url:", url);
        const repo = url.pathname.replace(/^\//, "").replace(/\/$/, "");
        console.log("🚀 ~ handleGitLabDownload ~ repo:", repo);

        const projectID = encodeURIComponent(repo);
        console.log("🚀 ~ handleGitLabDownload ~ projectID:", projectID);
        const hostname = url.hostname;
        console.log("🚀 ~ handleGitLabDownload ~ hostname:", hostname);
        // const apiURL = `https://${hostname}/api/v4/projects/${projectID}/repository/branches`;

        const response = await axios.get('https://malicious-code-scanner-backend.vercel.app/search', {
          params: {
            hostname,
            projectID,
          },
        });

        console.log("response", response.data);
        setIsNewFile(false);

        if (response.data.data === "No Malicious Code Found") {
          toast.success("No Malicious Code Found");
          searchResults.push("No Malicious Code Found");

        } else {
          toast.error(response.data.data);
          searchResults.push(response.data.data);
        }

        setResults(searchResults);

      } else {
        alert("Please enter a valid URL");
      }
    } catch (error) {
      setProgressBar(false);
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
    ? "#1A76D2"
    : results.length === 0
      ? "#343642"
      : results[0] === "No Malicious Code Found"
        ? "#39C837"
        : "#C83739";

  return (

    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <ResponsiveAppBar />
      <ToastContainer />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Left Side: App Card */}
        <Card
          sx={{ width: { xs: "90%", md: "45%" }, padding: 2, boxShadow: 3, marginBottom: { xs: 2, md: 0 }, }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upload a project ZIP file or enter a GitHub, GitLab, or Bitbucket project URL
            </Typography>
            <TextField
              fullWidth
              label="Enter a GitHub, GitLab, or Bitbucket project URL"
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
            />
            <FormControlLabel
              sx={{ float: 'left' }}
              control={
                <Checkbox
                  checked={scanCommits}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Include GitHub Commits"
              style={{ display: "flex", justifyContent: "left" }}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }} onClick={handleDownload}>
              Download and Scan
            </Button>

            <Divider sx={{ marginY: 3 }} />

            <UploadForm
              handleUpload={handleUpload}
              fileInputRef={fileInputRef}
              setGithubURL={setGithubURL}
              githubURL={githubURL}
              setResults={setResults}
              results={results}
            />
          </CardContent>
          <LinearProgress
            color="success"
            sx={{
              display: progressBar === false ? "none" : "block",
              marginTop: "20px",
              borderRadius: "5px",
            }}
          />
        </Card>

        {/* Right Side: Scan Results Card */}
        <Card sx={{ width: { xs: "90%", md: "45%" }, padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Scan Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <SearchResults results={results} />
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Box className="footer" sx={{
        fontSize: { xs: "0.8rem", md: "1rem" },
      }}>
        <Typography variant="body2" >
          Developed by <a
            style={{ color: "#1A76D9", textDecoration: "none" }}
            href="https://github.com/rust-master"
            target="_blank"
            rel="noreferrer"
          >
            Rust Master ❤️
          </a>
        </Typography>
      </Box>
      <Analytics />
    </Box>
  );
};

export default App;
