import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const BodyBinary = ({ bodyBinaryFileName, setBodyBinaryFileName }) => {
  const [file, setFile] = useState(null); // State to store the file

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);

    setFile(selectedFile); // Set the file in local state
    setBodyBinaryFileName({ image: selectedFile }); // Pass FormData to parent for submission
  };

  return (
    <Stack sx={{ width: "100%" }}>
      {/* TextField for the file selection */}
      <TextField
        value={file ? file.name : "Select file"} // Show file name if file is selected
        onClick={() => document.getElementById("file-input").click()} // Trigger file input on click
        fullWidth
        InputProps={{
          readOnly: true, // Make the TextField read-only
        }}
        sx={{ marginBottom: "16px", width: "30%" }}
      />

      {/* Hidden file input to trigger file selection */}
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelect} // Handle file selection
      />
    </Stack>
  );
};

export default BodyBinary;
