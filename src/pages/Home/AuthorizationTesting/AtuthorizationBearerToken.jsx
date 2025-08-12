import { Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const AtuthorizationBearerToken = ({ authData1, setAuthData1 }) => {
  // Individual states for userName and userPassword
  const [tokenData, setToknData] = useState(authData1?.tokenData || "");

  // Combined state for storing JSON data
  const [bearerToken, setBearerToken] = useState({ bearerToken: "" });

  // Handle change for userName
  const handleTokenChange = (event) => {
    setToknData(event.target.value);
  };

  // Update the combined authData whenever userName or userPassword changes
  useEffect(() => {
    setBearerToken({ tokenData });
  }, [tokenData]);

  useEffect(() => {
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
