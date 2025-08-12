import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const BodyRaw = ({ rowData, rawData, jsonData, setJsonData }) => {
  //   const [jsonData, setJsonData] = useState(""); // State to store JSON data
  const updateJsonDataInLocalStorage = (rowData, jsonDataValue) => {
    // Get the current collection data from localStorage
    const collectionData = JSON.parse(localStorage.getItem("collectionData"));

    // Find the collection that matches the parentRowId
    const updatedCollectionData = collectionData.map((collection) => {
      if (collection.id === rowData.parentRowId) {
        // Find the file inside the collection that matches childRowId
        const updatedItems = collection.files.map((file) => {
          if (file.id === rowData.childRowId) {
            // Update apiMethod in the correct file
            return {
              ...file,
              items: file.items.map((item, index) =>
                index === 0 ? { ...item, jsonData: jsonDataValue } : item
              ),
            };
          }
          return file;
        });

        // Return updated collection with modified files
        return { ...collection, files: updatedItems };
      }
      return collection;
    });

    // Save the updated collection back to localStorage
    localStorage.setItem(
      "collectionData",
      JSON.stringify(updatedCollectionData)
    );
  };

  const handleJsonDataChange = (event) => {
    const jsonDataValue = event.target.value;
    setJsonData(jsonDataValue); // Update state with typed data
    updateJsonDataInLocalStorage(rowData, jsonDataValue);
  };

  return (
    <Stack>
      {rawData === "JSON" && (
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {/* TextField for typing JSON data */}
          <TextField
            multiline
            fullWidth
            value={jsonData}
            onChange={handleJsonDataChange}
            placeholder="Type JSON data here"
            variant="outlined"
            rows={10} // Adjust rows for the text area height
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removing the border
              },
              "& .MuiInputBase-root": {
                fontFamily: "monospace", // For JSON-like styling
                fontSize: "14px", // Adjust font size
                whiteSpace: "pre", // For proper display of JSON structure
              },
            }}
          />
        </Stack>
      )}

      {rawData === "TEXT" && (
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {/* TextField for typing JSON data */}
          <TextField
            multiline
            fullWidth
            value={jsonData}
            onChange={handleJsonDataChange}
            placeholder="Type Text data here"
            variant="outlined"
            rows={10} // Adjust rows for the text area height
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removing the border
              },
              "& .MuiInputBase-root": {
                fontFamily: "monospace", // For JSON-like styling
                fontSize: "14px", // Adjust font size
                whiteSpace: "pre", // For proper display of JSON structure
              },
            }}
          />
        </Stack>
      )}

      {rawData === "JavaScript" && (
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {/* TextField for typing JSON data */}
          <TextField
            multiline
            fullWidth
            value={jsonData}
            onChange={handleJsonDataChange}
            placeholder="Type JavaScript data here"
            variant="outlined"
            rows={10} // Adjust rows for the text area height
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removing the border
              },
              "& .MuiInputBase-root": {
                fontFamily: "monospace", // For JSON-like styling
                fontSize: "14px", // Adjust font size
                whiteSpace: "pre", // For proper display of JSON structure
              },
            }}
          />
        </Stack>
      )}

      {rawData === "XML" && (
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {/* TextField for typing JSON data */}
          <TextField
            multiline
            fullWidth
            value={jsonData}
            onChange={handleJsonDataChange}
            placeholder="Type XML data here"
            variant="outlined"
            rows={10} // Adjust rows for the text area height
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removing the border
              },
              "& .MuiInputBase-root": {
                fontFamily: "monospace", // For JSON-like styling
                fontSize: "14px", // Adjust font size
                whiteSpace: "pre", // For proper display of JSON structure
              },
            }}
          />
        </Stack>
      )}

      {rawData === "HTML" && (
        <Stack
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {/* TextField for typing JSON data */}
          <TextField
            multiline
            fullWidth
            value={jsonData}
            onChange={handleJsonDataChange}
            placeholder="Type HTML data here"
            variant="outlined"
            rows={10} // Adjust rows for the text area height
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none", // Removing the border
              },
              "& .MuiInputBase-root": {
                fontFamily: "monospace", // For JSON-like styling
                fontSize: "14px", // Adjust font size
                whiteSpace: "pre", // For proper display of JSON structure
              },
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default BodyRaw;
