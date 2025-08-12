import { Stack } from "@mui/material";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import HeaderHidden from "./HeaderHidden";
import HeaderAutoGen from "./HeaderAutoGen";

const Headers = ({ headerJsonData, setHeaderJsonData, bodyType, raw }) => {
  const [headerData, setHeaderData] = useState(false);
  // const [headerJsonData, setHeaderJsonData] = useState([]);

  // Toggle the headerData between true and false on each click
  const handleHeaders = () => {
    setHeaderData((prevState) => !prevState);
  };



  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "3px solid red",
        height: "100%",
      }}
    >
      {" "}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "12px",
          gap: 3,
        }}
      >
        <Stack>Headers</Stack>
        <Stack
          sx={{ display: "flex", flexDirection: "row" }}
          onClick={handleHeaders}
        >
          {headerData ? (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "Center",
                gap: 1,
              }}
            >
              <Stack>
                <IoEyeOutline />
              </Stack>
              <Stack>hidden</Stack>
            </Stack>
          ) : (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "Center",
                gap: 1,
              }}
            >
              <Stack>
                <IoEyeOffOutline />
              </Stack>
              <Stack>Hide auto-generated header</Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack>
        {headerData ? (
          <Stack sx={{ marginTop: "20px" }}>
            <HeaderHidden
              headerData={headerData}
              headerJsonData={headerJsonData}
              setHeaderJsonData={setHeaderJsonData}
              
            />
          </Stack>
        ) : (
          <Stack sx={{ marginTop: "20px" }}>
            <HeaderHidden
              headerData={headerData}
              headerJsonData={headerJsonData}
              setHeaderJsonData={setHeaderJsonData}
              bodyType={bodyType}
              raw={raw}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Headers;
