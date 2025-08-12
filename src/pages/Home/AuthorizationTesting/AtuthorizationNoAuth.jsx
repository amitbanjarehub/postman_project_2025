import { Stack } from "@mui/material";
import React from "react";
import { FaMinus } from "react-icons/fa";
const AtuthorizationNoAuth = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: 1,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "60px",
            borderRadius: "8px",
            backgroundColor: "#e6f1f5",
            // border: "1px solid red",
          }}
        >
          <FaMinus />
        </Stack>
        <Stack sx={{ fontWeight: 600 }}>No Auth</Stack>
        <Stack>This request does not use any authorization.</Stack>
      </Stack>
    </Stack>
  );
};

export default AtuthorizationNoAuth;
