import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Scanner from "@mui/icons-material/Scanner";

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
    <div style={{marginTop:"8px"}}>
      <form onSubmit={handleSubmit} className="formDiv">
        <input className="fileInput" type="file" onChange={handleFileChange} ref={fileInputRef}/>

        <Button className="scanBtn" type="submit" startDecorator={<Scanner />}>
          Scan
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
