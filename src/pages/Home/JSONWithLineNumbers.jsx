import {
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { PiLineVerticalLight } from "react-icons/pi";
import { MdOutlineHistory } from "react-icons/md";
import ResponseBody from "./Response/ResponseBody";
import ResponseCookies from "./Response/ResponseCookies";
import ResponseHeader from "./Response/ResponseHeader";
import ResponseResult from "./Response/ResponseResult";
import ResponseErrorLog from "./Response/ResponseErrorLog";
const JSONWithLineNumbers = ({
  json,
  responseTime,
  statusCode,
  responseSize,
  lastCallTime,
  errorMessage,
  rowData,
  errorApi,
  errorLogDataValue,
  errorMessage1,
}) => {
  // Split the JSON data by new lines
  const jsonLines = JSON.stringify(json, null, 2).split("\n");
  // console.log("responseData:---------->>>>", json);
  // console.log("statusCode:---------->>>>", statusCode);
  // console.log("jsonLines:---------->>>>", jsonLines);
  // State to manage the Menu anchor element and visibility
  const [anchorEl, setAnchorEl] = useState(null);
  const [ErrorLogData, setErrorLogData] = useState([]);
  const [headerResData, setHeaderResData] = useState({});
  const openMenu = Boolean(anchorEl); // Boolean to check if the menu is open
  const [resultRes, setResultRes] = useState(false);
  const [headersRes, setHeadersRes] = useState(false);
  const [bodyRes, setBodyRes] = useState(true);
  const [cookiesRes, setCookiesRes] = useState(false);
  const [errorLogRes, seterrorLogRes] = useState(false);

  // Function to handle opening the menu
  const handleMenuClick1 = (event) => {
    setAnchorEl(event.currentTarget); // Set the menu's anchor to the clicked element
  };

  // Function to handle closing the menu
  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu by setting anchorEl to null
  };

  useEffect(() => {
    // Check if the specific row's data exists in localStorage
    const storedData = JSON.parse(localStorage.getItem("collectionData"));
    if (storedData) {
      // Find the collection and file based on rowData's parentRowId and childRowId
      storedData.forEach((collection) => {
        if (collection.id === rowData.parentRowId) {
          collection.files.forEach((file) => {
            if (file.id === rowData.childRowId) {
              setErrorLogData(file.errorLogs);
              setHeaderResData(file.items[0].headers);
            }
          });
        }
      });
    }
  }, [rowData, errorApi, errorMessage, errorLogDataValue]);
  // console.log("ErrorLogData:---------->>>", ErrorLogData);
  // console.log("errorLogDataValue:---------->>>", errorLogDataValue);
  // console.log("headerResData:---------->>>", headerResData);

  const handleBodyRes = () => {
    setResultRes(false);
    setHeadersRes(false);
    setCookiesRes(false);
    seterrorLogRes(false);
    setBodyRes(true);
  };

  const handleCookiesRes = () => {
    setResultRes(false);
    setHeadersRes(false);
    setBodyRes(false);
    seterrorLogRes(false);
    setCookiesRes(true);
  };

  const handleHeadersRes = () => {
    setResultRes(false);
    setBodyRes(false);
    setCookiesRes(false);
    seterrorLogRes(false);
    setHeadersRes(true);
  };

  const handleResultRes = () => {
    setHeadersRes(false);
    setBodyRes(false);
    setCookiesRes(false);
    seterrorLogRes(false);
    setResultRes(true);
  };

  const handleErrorLogRes = () => {
    setHeadersRes(false);
    setBodyRes(false);
    setCookiesRes(false);
    setResultRes(false);
    seterrorLogRes(true);
  };

  return (
    <>
      {json || json.length > 0 || statusCode ? (
        <Stack sx={{ display: "flex", flexDirection: "column" }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                marginLeft: "4px",
              }}
            >
              <Stack
                sx={{
                  fontSize: "12px",
                  borderBottom: bodyRes ? "2px solid blue" : "none",
                }}
                onClick={handleBodyRes}
              >
                Body
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  borderBottom: cookiesRes ? "2px solid blue" : "none",
                }}
                onClick={handleCookiesRes}
              >
                Cookies
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  borderBottom: headersRes ? "2px solid blue" : "none",
                }}
                onClick={handleHeadersRes}
              >
                Headers
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  borderBottom: resultRes ? "2px solid blue" : "none",
                }}
                onClick={handleResultRes}
              >
                Test Results
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: errorLogRes ? "2px solid blue" : "none",
                }}
                onClick={handleErrorLogRes}
                // onClick={(event) => handleMenuClick1(event)} // Ensure the event is passed to the function
              >
                <Stack>
                  <MdOutlineHistory fontSize="12px" />
                </Stack>
                <Stack sx={{ fontSize: "12px" }}>Error Log</Stack>
              </Stack>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                  sx: {
                    width: 400, // Adjust the width of the menu
                    height: 236,
                    padding: 0,
                  },
                }}
              >
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 220, // Adjust the max height of the table
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                >
                  <Table stickyHeader aria-label="error logs" size="small">
                    <TableBody>
                      {ErrorLogData && ErrorLogData.length > 0 ? (
                        ErrorLogData.map((log, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#e6e6e6", // Hover effect color
                              },
                            }}
                          >
                            <TableCell>
                              {log.date}, {log.time}
                            </TableCell>
                            <TableCell sx={{ color: "red" }}>
                              {log.status}, {log.errorMsg}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                            No error logs available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Menu>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              {" "}
              <Stack
                sx={{
                  backgroundColor:
                    statusCode === 200 || statusCode === 201
                      ? "#e1faec" // Green for success
                      : statusCode === 404
                      ? "#edbebe" // Red for "Not Found"
                      : statusCode === 500
                      ? "#f8d7da" // Red for internal server error
                      : "#ffffff", // Default white background if no status code is present
                  padding: "4px",
                  fontSize: "12px",
                }}
              >
                {statusCode}{" "}
                {statusCode === 200 || statusCode === 201
                  ? "OK"
                  : statusCode === 404
                  ? "(Not Found)"
                  : statusCode === 500
                  ? "Internal Server Error"
                  : ""}
              </Stack>
              <Stack>
                <GoDotFill style={{ color: "#e6e8e8" }} />
              </Stack>
              <Stack sx={{ fontSize: "12px" }}>{responseTime}ms</Stack>
              <Stack>
                <GoDotFill style={{ color: "#e6e8e8" }} />
              </Stack>
              <Stack sx={{ fontSize: "12px" }}>{responseSize}</Stack>
              <Stack>
                <GoDotFill style={{ color: "#e6e8e8" }} />
              </Stack>
              <Stack sx={{ fontSize: "12px" }}>{lastCallTime}</Stack>
              <Stack>
                <PiLineVerticalLight />
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#c7c9c9",
                  padding: "4px",
                }}
              >
                Save Response
              </Stack>
              <Stack sx={{ marginRight: "8px" }}>
                <IoEllipsisHorizontalSharp />
              </Stack>
            </Stack>
          </Stack>
          {/* <Stack sx={{ marginTop: "8px" }}>           
            {statusCode !== 200 && statusCode !== 201 ? (
              <Typography color="error">{errorMessage}</Typography>
            ) : (
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  fontFamily: "monospace",
                }}
              >
                {jsonLines.map((line, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <span style={{ color: "#888", paddingRight: "10px" }}>
                      {index + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </pre>
            )}
          </Stack> */}

          {/* cookiesRes, headersRes, resultRes */}
          {bodyRes && (
            <ResponseBody
              statusCode={statusCode}
              errorMessage={errorMessage}
              jsonLines={jsonLines}
              errorMessage1={errorMessage1}
              json={json}
            />
          )}

          {cookiesRes && <ResponseCookies />}

          {headersRes && <ResponseHeader headerResData={headerResData} />}

          {resultRes && <ResponseResult />}

          {errorLogRes && <ResponseErrorLog ErrorLogData={ErrorLogData} />}
        </Stack>
      ) : (
        <>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Stack>Response</Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Stack>
                <MdOutlineHistory />
              </Stack>
              <Stack>History</Stack>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default JSONWithLineNumbers;
