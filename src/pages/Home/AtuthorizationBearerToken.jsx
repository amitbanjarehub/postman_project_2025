import { Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const AtuthorizationBearerToken = ({ authData1, setAuthData1, rowData }) => {
  // Individual states for userName and userPassword
  const [tokenData, setToknData] = useState(authData1 || "");

  // Combined state for storing JSON data
  const [bearerToken, setBearerToken] = useState({ bearerToken: "" });

  // Handle change for userName
  const handleTokenChange = (event) => {
    const authTokenData = event.target.value;
    setToknData(event.target.value);

    const updateRowDataInLocalStorage = (rowData, authTokenData) => {
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
                  index === 0
                    ? {
                        ...item,
                        authData: authTokenData,
                      }
                    : item
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

    updateRowDataInLocalStorage(rowData , authTokenData);
  };

  // Update the combined authData whenever userName or userPassword changes
  useEffect(() => {
    setBearerToken({ tokenData });
    setAuthData1({ tokenData });
  }, [tokenData]);

 

//   console.log("TokenData:====================>>>>>", bearerToken);
  return (
    <Stack
      sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Stack sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Stack sx={{ width: "10%" }}>Token:</Stack>
        <Stack>
          <TextField
            size="small"
            value={tokenData}
            multiline // Enable multiline behavior           
            onChange={handleTokenChange}
          />
         
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AtuthorizationBearerToken;
