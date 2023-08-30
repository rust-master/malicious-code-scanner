import React, { useState } from "react";
import Button from "@mui/joy/Button";
import { styled } from "@mui/joy";
import Scanner from "@mui/icons-material/Scanner";

const UploadForm = ({ handleUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (file) {
        handleUpload(file);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />

        <Button style={{ marginLeft: "50px" }} type="submit" startDecorator={<Scanner />}>
          Scan
        </Button>
      </form>
    </div>
  );
};

export default UploadForm;
