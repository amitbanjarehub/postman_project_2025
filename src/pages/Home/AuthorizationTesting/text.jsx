import React, { useState, useEffect } from "react";
import { Stack, Select, MenuItem, Divider } from "@mui/material";
import AtuthorizationNoAuth from "./AtuthorizationNoAuth";
import AtuthorizationBasicAuth from "./AtuthorizationBasicAuth";
import AtuthorizationBearerToken from "./AtuthorizationBearerToken";

const Authorization = ({ authorizedType, setAuthorizedType, authData1, setAuthData1 }) => {
  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      setAuthData1(JSON.parse(storedAuthData)); // Load authData from localStorage
    }
  }, []);

  const handleAuthorizationChange = (event) => {
    setAuthorizedType(event.target.value);
  };

  // Whenever authData1 changes, save it to localStorage
  useEffect(() => {
    if (authData1) {
      localStorage.setItem("authData", JSON.stringify(authData1));
    }
  }, [authData1]);

  // Save authorizedType to localStorage
  useEffect(() => {
    localStorage.setItem("authorizedType", authorizedType);
  }, [authorizedType]);

  return (
    <Stack sx={{ height: "100%", marginTop: "20px" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Stack sx={{ width: "30%", borderRight: "1px solid grey", height: "100%" }}>
          <Stack sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Stack>Auth type</Stack>
            <Stack sx={{ width: "60%" }}>
              <Select value={authorizedType} onChange={handleAuthorizationChange}>
                <MenuItem value="noAuth">No Auth</MenuItem>
                <MenuItem value="basicAuth">Basic Auth</MenuItem>
                <MenuItem value="bearerToken">Bearer Token</MenuItem>
                {/* Other options */}
              </Select>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ width: "70%", borderLeft: "1px solid grey", height: "100%" }}>
          {authorizedType === "noAuth" && <AtuthorizationNoAuth />}
          {authorizedType === "basicAuth" && <AtuthorizationBasicAuth authData1={authData1} setAuthData1={setAuthData1} />}
          {authorizedType === "bearerToken" && <AtuthorizationBearerToken authData1={authData1} setAuthData1={setAuthData1} />}
          {/* Other cases */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Authorization;
