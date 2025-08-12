import { Divider, MenuItem, Select, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AtuthorizationNoAuth from "./AtuthorizationNoAuth";
import AtuthorizationBasicAuth from "./AtuthorizationBasicAuth";
import AtuthorizationBearerToken from "./AtuthorizationBearerToken";

const Authorization = ({
  authoriziedType,
  setAuthoriziedType,
  authData1,
  setAuthData1,
  rowData,
}) => {
  // const [authoriziedType, setAuthoriziedType] = useState("noAuth");
  // Load authData from localStorage when the component mounts
  // useEffect(() => {
  //   const storedAuthData = localStorage.getItem("authData");
  //   if (storedAuthData) {
  //     setAuthData1(JSON.parse(storedAuthData)); // Parse the JSON string and set state
  //   }
  // }, []);

  const handleAuthorizationChange = (event) => {
    const authType = event.target.value;
    setAuthoriziedType(authType);
    // Save the updated auth data and type for this row in localStorage

    const updateRowDataInLocalStorage = (rowData, authType) => {
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
                        authoriziedType: authType,
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

    updateRowDataInLocalStorage(rowData, authType);
  };

  // Whenever authData1 changes, save it to localStorage
  // useEffect(() => {
  //   if (authData1) {
  //     localStorage.setItem("authData", JSON.stringify(authData1)); // Save authData as a string
  //   }
  // }, [authData1]);

  // Whenever authData1 changes, save it to localStorage
  //  useEffect(() => {
  //   localStorage.setItem("authorizedType", authoriziedType);
  //   // When "No Auth" is selected, set authData1 as empty
  //   if (authoriziedType === "noAuth") {
  //     setAuthData1({});
  //     localStorage.setItem("authData", JSON.stringify({})); // Save empty auth data
  //   }
  // }, [authoriziedType]);

  return (
    <Stack sx={{ height: "100%", marginTop: "20px" }}>
      {" "}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          sx={{ width: "30%", borderRight: "1px solid grey", height: "100%" }}
        >
          <Stack
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Stack>Auth type</Stack>
            <Stack sx={{ width: "60%" }}>
              {" "}
              <Select
                value={authoriziedType}
                onChange={handleAuthorizationChange}
              >
                <MenuItem value="noAuth">No Auth</MenuItem>
                <MenuItem value="basicAuth">Basic Auth</MenuItem>
                <MenuItem value="bearerToken">Bearer Token</MenuItem>
                <MenuItem value="jwtBearer">JWT Bearer</MenuItem>
                <MenuItem value="digestAuth">Digest Auth</MenuItem>
                <MenuItem value="oauth1">OAuth 1.0</MenuItem>
                <MenuItem value="oauth2">OAuth 2.0</MenuItem>
                <MenuItem value="hawkAuth">Hawk Authentication</MenuItem>
                <MenuItem value="awsSignature">AWS Signature</MenuItem>
                <MenuItem value="ntlmAuth">NTLM Authentication</MenuItem>
                <MenuItem value="apiKey">API Key</MenuItem>
                <MenuItem value="akamaiEdgeGrid">Akamai EdgeGrid</MenuItem>
                <MenuItem value="asapAtlassian">ASAP (Atlassian)</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          sx={{ width: "70%", borderLeft: "1px solid grey", height: "100%" }}
        >
          {authoriziedType === "noAuth" && (
            <Stack sx={{ marginLeft: "8px", height: "100%" }}>
              <AtuthorizationNoAuth
                authData1={authData1}
                setAuthData1={setAuthData1}
                authoriziedType={authoriziedType}
                rowData={rowData}
              />
            </Stack>
          )}
          {authoriziedType === "basicAuth" && (
            <Stack sx={{ marginLeft: "8px", height: "100%" }}>
              <AtuthorizationBasicAuth
                authData1={authData1}
                setAuthData1={setAuthData1}
                rowData={rowData}
              />
            </Stack>
          )}
          {authoriziedType === "bearerToken" && (
            <Stack sx={{ marginLeft: "8px" }}>
              <AtuthorizationBearerToken
                authData1={authData1}
                setAuthData1={setAuthData1}
                rowData={rowData}
              />
            </Stack>
          )}
          {authoriziedType === "jwtBearer" && (
            <Stack sx={{ marginLeft: "8px" }}>jwtBearer</Stack>
          )}
          {authoriziedType === "digestAuth" && (
            <Stack sx={{ marginLeft: "8px" }}>digestAuth</Stack>
          )}
          {authoriziedType === "oauth1" && (
            <Stack sx={{ marginLeft: "8px" }}>oauth1</Stack>
          )}
          {authoriziedType === "oauth2" && (
            <Stack sx={{ marginLeft: "8px" }}>oauth2</Stack>
          )}
          {authoriziedType === "hawkAuth" && (
            <Stack sx={{ marginLeft: "8px" }}>hawkAuth</Stack>
          )}
          {authoriziedType === "awsSignature" && (
            <Stack sx={{ marginLeft: "8px" }}>awsSignature</Stack>
          )}
          {authoriziedType === "ntlmAuth" && (
            <Stack sx={{ marginLeft: "8px" }}>ntlmAuth</Stack>
          )}
          {authoriziedType === "apiKey" && (
            <Stack sx={{ marginLeft: "8px" }}>apiKey</Stack>
          )}
          {authoriziedType === "akamaiEdgeGrid" && (
            <Stack sx={{ marginLeft: "8px" }}>akamaiEdgeGrid</Stack>
          )}
          {authoriziedType === "asapAtlassian" && (
            <Stack sx={{ marginLeft: "8px" }}>asapAtlassian</Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Authorization;
