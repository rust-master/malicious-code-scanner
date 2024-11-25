import React, { useState } from "react";
import { Button } from "@mui/material";;


const UploadForm = ({ handleUpload, fileInputRef, setGithubURL, githubURL }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setGithubURL("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file before scanning.");
      return;
    }
    try {
      handleUpload(file);
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  // Reset the file input when GitHub download is triggered
  React.useEffect(() => {
    if (githubURL && fileInputRef.current) {
      fileInputRef.current.value = '';  // Clear the file input
      setFile(null);  // Reset the file state
    }
  }, [githubURL]);  // Only when githubURL change

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <form onSubmit={handleSubmit} className="formDiv" style={{ display: "inline-block", width: "100%" }}>
        <input
          className="fileInput"
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "98%",
          }}
        />

        <Button
          variant="contained" color="primary" fullWidth
          type="submit"
        >
          Scan
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
