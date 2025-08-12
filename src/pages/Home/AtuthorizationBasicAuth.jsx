import { Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const AtuthorizationBasicAuth = ({ authData1, setAuthData1, rowData }) => {
  // Individual states for userName and userPassword
  const [userName, setUserName] = useState(authData1?.userName || "");
  const [userPassword, setUserPassword] = useState(
    authData1?.userPassword || ""
  );
  // Combined state for storing JSON data
  const [authData, setAuthData] = useState({ userName: "", userPassword: "" });

  // Handle change for userName
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Handle change for userPassword
  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  // Update the combined authData whenever userName or userPassword changes
  useEffect(() => {
    setAuthData({ userName, userPassword });
  }, [userName, userPassword]);

  useEffect(() => {
    setAuthData1(authData);

    const updateRowDataInLocalStorage = (rowData, authData) => {
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
                        authData: authData,
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

    updateRowDataInLocalStorage(rowData , authData);
  }, [authData]);

  //   console.log("authData:==========>>>", authData);

  return (
    <Stack
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "20%" }}>User Name:</Stack>
        <Stack>
          <TextField
            size="small"
            value={userName}
            onChange={handleUserNameChange} // Update userName state on change
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "20%" }}>User Password:</Stack>
        <Stack>
          <TextField
            size="small"
            value={userPassword}
            onChange={handleUserPasswordChange} // Update userPassword state on change
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AtuthorizationBasicAuth;
