import { Stack } from "@mui/material";
import React from "react";

const ResponseCookies = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // border: "2px solid red",
        minHeight: "20vh",
      }}
    >
      <Stack sx={{ fontWeight: 700, color: "black" }}>
        No cookies received from the server
      </Stack>
      <Stack>
        All your cookies and their associated domains will appear here.
      </Stack>
    </Stack>
  );
};

export default ResponseCookies;
