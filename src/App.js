import React, { useState } from 'react';
import './App.css';
import UploadForm from './UploadForm';
import SearchResults from './SearchResults';
import JSZip from 'jszip'; // Import the JSZip library


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
          const fileData = await zip.files[filename].async('string');
          if (fileData.includes('YWNjZXNzU3luYw')) {
            searchResults.push(filename);
          }
        })
      );

      setResults(searchResults);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App" style={{backgroundColor: results.length == 0 ? "green" : 'red'}} >
      <h1>Malicious Code Scanner</h1>
      <UploadForm handleUpload={handleUpload} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;
