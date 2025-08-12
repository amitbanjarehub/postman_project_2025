import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ResponseBody = ({
  statusCode,
  errorMessage,
  jsonLines,
  errorMessage1,
  json,
}) => {
  // console.log("json:===========>>>", json);
  const [bodyResponseMenu, setBodyResponseMenu] = useState("JSON");
  const [visualizeResponseMenu, setVisualizeResponseMenu] = useState("0");

  const [jsonMenu, setJsonMenu] = useState(true);
  const [xmlMenu, setXmlMenu] = useState(false);
  const [htmlMenu, setHtmlMenu] = useState(false);
  const [javaScriptMenu, setJavaScriptMenu] = useState(false);
  const [rawMenu, setRawMenu] = useState(false);
  const [hexMenu, setHexMenu] = useState(false);
  const [base64Menu, setBase64Menu] = useState(false);

  const [dataMenu, setDataMenu] = useState(true);
  const [previewMenu, setPreviewMenu] = useState(false);
  const [visualizeMenu, setVisualizeMenu] = useState(false);

  const handleDataMenu = () => {
    setPreviewMenu(false);
    setVisualizeMenu(false);
    setDataMenu(true);
  };

  const handlePreviewMenu = () => {
    setVisualizeMenu(false);
    setDataMenu(false);
    setPreviewMenu(true);
  };

  const handleVisualizeMenu = () => {
    setDataMenu(false);
    setPreviewMenu(false);
    setVisualizeMenu(true);
  };

  const handleJsonMenu = () => {
    setXmlMenu(false);
    setHtmlMenu(false);
    setJavaScriptMenu(false);
    setRawMenu(false);
    setHexMenu(false);
    setBase64Menu(false);
    setJsonMenu(true);
  };

  const handleXmlMenu = () => {
    setJsonMenu(false);
    setHtmlMenu(false);
    setJavaScriptMenu(false);
    setRawMenu(false);
    setHexMenu(false);
    setBase64Menu(false);
    setXmlMenu(true);
  };

  const handleHtmlMenu = () => {
    setJsonMenu(false);
    setXmlMenu(false);
    setJavaScriptMenu(false);
    setRawMenu(false);
    setHexMenu(false);
    setBase64Menu(false);
    setHtmlMenu(true);
  };

  const handleJavaScript = () => {
    setJsonMenu(false);
    setXmlMenu(false);
    setHtmlMenu(false);
    setRawMenu(false);
    setHexMenu(false);
    setBase64Menu(false);
    setJavaScriptMenu(true);
  };

  const handleRawMenu = () => {
    setJsonMenu(false);
    setXmlMenu(false);
    setHtmlMenu(false);
    setJavaScriptMenu(false);
    setHexMenu(false);
    setBase64Menu(false);
    setRawMenu(true);
  };

  const handleHexMenu = () => {
    setJsonMenu(false);
    setXmlMenu(false);
    setHtmlMenu(false);
    setJavaScriptMenu(false);
    setRawMenu(false);
    setBase64Menu(false);
    setHexMenu(true);
  };

  const handlebas64Menu = () => {
    setJsonMenu(false);
    setXmlMenu(false);
    setHtmlMenu(false);
    setJavaScriptMenu(false);
    setRawMenu(false);
    setHexMenu(false);
    setBase64Menu(true);
  };

  const handleChange = (event) => {
    setBodyResponseMenu(event.target.value);
  };

  const handleChange1 = (event) => {
    setVisualizeResponseMenu(event.target.value);
  };

  const renderHex = () => {
    // Function to convert string to hexadecimal
    const toHex = (str) => {
      return str
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ");
    };

    function convertToHex(json, maxLength = 56) {
      let hexOutput = "";

      json.forEach((item, index) => {
        let jsonString = JSON.stringify(item);
        let hexString = "";

        // Loop through each character of the string and convert it to hex
        for (let i = 0; i < jsonString.length; i++) {
          hexString +=
            jsonString
              .charCodeAt(i)
              .toString(16)
              .padStart(2, "0")
              .toUpperCase() + " ";
        }

        // Limit the length of the hexadecimal string
        if (hexString.length > maxLength) {
          hexString = hexString.substring(0, maxLength);
        }

        // Format the line number with leading zeros (for example, 00000000, 00000001, ...)
        let lineNumber = (index * jsonString.length)
          .toString(16)
          .padStart(8, "0")
          .toUpperCase();

        hexOutput += `${lineNumber}: ${hexString} \n`;
      });

      return hexOutput;
    }

    // Create a concise version of the test string that fits within the hex output width
    let test = json.map((item, index) => JSON.stringify(item)).join(", ");

    const hexData = convertToHex(json);

    return (
      <pre
        style={{
          background: "#f5f5f5",
          padding: "10px",
          fontFamily: "monospace",
          borderRadius: "5px",
          overflowX: "auto",
          fontSize: "12px",
        }}
      >
        {/* {jsonLines.map((line, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
            <span
              style={{
                color: "#888",
                paddingRight: "10px",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </span>
            <span>{toHex(line)}</span>
          </div>
        ))} */}
        {hexData}
      </pre>
    );
  };

  const convertToBase64 = (json) => {
    let hexOutput = "";

    json.forEach((item, index) => {
      let jsonString = JSON.stringify(item);
      let hexString = "";

      // Loop through each character of the string and convert it to hex
      for (let i = 0; i < jsonString.length; i++) {
        hexString +=
          jsonString.charCodeAt(i).toString(16).padStart(2, "0").toUpperCase() +
          " ";
      }

      // Format the line number with leading zeros (for example, 00000000, 00000001, ...)
      let lineNumber = (index * jsonString.length)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase();

      hexOutput += `${lineNumber}: ${hexString} \n`;
    });

    // Convert the hex string to base64 using btoa in browser
    const base64Encoded = btoa(hexOutput); // btoa is a built-in browser function
    return base64Encoded;
  };

  const renderBase64 = () => {
    // Convert the data to base64
    const base64EncodedData = convertToBase64(json);

    return (
      <pre
        style={{
          width: "100%", // Full width of the container
          height: "auto", // Auto height based on the content
          overflowX: "hidden", // Hide horizontal scrolling
          overflowY: "auto", // Enable vertical scrolling
          whiteSpace: "pre-wrap", // Allow the content to wrap
          wordWrap: "break-word", // Break long words to fit the container
          fontSize: "12px", // Font size for the base64 text
          maxHeight: "400px", // Optional: Set a max height to make it scrollable
        }}
      >
        {base64EncodedData}
      </pre>
    );
  };

  return (
    <Stack>
      <Stack sx={{ display: "flex", flexDirection: "column" }}>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: dataMenu ? "#ededed" : "none",
              "&:hover": {
                backgroundColor: "#ededed", // Background color on hover
              },
              borderRadius: "4px",
            }}
            // onClick={handleDataMenu}
            onClick={() => {
              setPreviewMenu(false);
              setVisualizeMenu(false);
              setDataMenu(true);
            }}
          >
            <Select
              value={bodyResponseMenu}
              onChange={handleChange}
              size="small"
              // sx={{border: "2px solid red"}}
              sx={{
                border: "none", // Remove border entirely
                fontSize: "12px", // Set font size to 12px
                "& .MuiSelect-select": {
                  border: "none", // Remove inner select border
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the outline border for the outlined version
                },
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <MenuItem value={"JSON"} onClick={handleJsonMenu}>
                JSON
              </MenuItem>
              <MenuItem value={"XML"} onClick={handleXmlMenu}>
                XML
              </MenuItem>
              <MenuItem value={"HTML"} onClick={handleHtmlMenu}>
                HTML
              </MenuItem>
              <MenuItem value={"JavaScript"} onClick={handleJavaScript}>
                JavaScript
              </MenuItem>
              <MenuItem value={"Raw"} onClick={handleRawMenu}>
                Raw
              </MenuItem>
              <MenuItem value={"Hex"} onClick={handleHexMenu}>
                Hex
              </MenuItem>
              <MenuItem value={"Base64"} onClick={handlebas64Menu}>
                Base64
              </MenuItem>
            </Select>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px", // Set font size to 12px
              backgroundColor: previewMenu ? "#ededed" : "none",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#ededed", // Background color on hover
              },
            }}
            // onClick={handlePreviewMenu}
            onClick={() => {
              setPreviewMenu(true);
              setVisualizeMenu(false);
              setDataMenu(false);
            }}
          >
            Preview
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: visualizeMenu ? "#ededed" : "none",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#ededed", // Background color on hover
              },
            }}
            // onClick={handleVisualizeMenu}
            onClick={() => {
              setPreviewMenu(false);
              setVisualizeMenu(true);
              setDataMenu(false);
            }}
          >
            {" "}
            <Select
              value={visualizeResponseMenu}
              onChange={handleChange1}
              size="small"
              sx={{
                border: "none", // Remove border entirely
                fontSize: "12px", // Set font size to 12px
                "& .MuiSelect-select": {
                  border: "none", // Remove inner select border
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the outline border for the outlined version
                },
              }}
            >
              <MenuItem value={"0"}>Visualize</MenuItem>
              <MenuItem value={"Table"}>Table</MenuItem>
              <MenuItem value={"LinearChart"}>Linear Chart</MenuItem>
              <MenuItem value={"BarGraph"}>Bar Graph</MenuItem>
              <MenuItem value={"Prompt"}>Set up with a prompt</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Stack sx={{ marginTop: "8px" }}>
          {/* {console.log("statusCode131:----------->>>", statusCode)} */}
          {/* {console.log("statusCode131:----------->>>", statusCode)}
        {console.log("errorMessage131:----------->>>", errorMessage)}
        {console.log("jsonLines131:----------->>>", jsonLines)} */}
          {/* {console.log("statusCode:----------->>>", statusCode)} */}
          {statusCode !== 200 && statusCode !== 201 ? (
            statusCode === null ? null : // <Typography color="error">
            //   {errorMessage || `Error: ${errorMessage1}`}
            // </Typography>
            statusCode === 404 ? (
              <Typography sx={{color: "red", marginLeft: "4px"}}>Error: Not Found</Typography>
            ) : statusCode === 500 ? (
              <Typography sx={{color: "red", marginLeft: "4px"}}>Error: Internal Server Error</Typography>
            ) : (
              ""
            )
          ) : (
            // <pre
            //   style={{
            //     background: "#f5f5f5",
            //     padding: "10px",
            //     fontFamily: "monospace",
            //   }}
            // >
            //   {jsonLines.map((line, index) => (
            //     <div key={index} style={{ display: "flex" }}>
            //       <span style={{ color: "#888", paddingRight: "10px" }}>
            //         {index + 1}
            //       </span>
            //       <span>{line}</span>
            //     </div>
            //   ))}
            // </pre>

            <>
              {jsonMenu && (
                <pre
                  style={{
                    background: "#f5f5f5",
                    padding: "10px",
                    fontFamily: "monospace",
                    borderRadius: "5px",
                    overflowX: "auto",
                  }}
                >
                  {jsonLines.map((line, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", marginBottom: "5px" }}
                    >
                      <span
                        style={{
                          color: "#888",
                          paddingRight: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </pre>
              )}

              {xmlMenu && (
                <p style={{ fontSize: "12px" }}>
                  [{json.map((item, index) => JSON.stringify(item)).join(", ")}]
                </p>
              )}

              {htmlMenu && (
                <p style={{ fontSize: "12px" }}>
                  [{json.map((item, index) => JSON.stringify(item)).join(", ")}]
                </p>
              )}

              {javaScriptMenu && (
                <p style={{ fontSize: "12px", color: "#8637ed" }}>
                  [{json.map((item, index) => JSON.stringify(item)).join(", ")}]
                </p>
              )}

              {rawMenu && (
                <p style={{ fontSize: "12px" }}>
                  [{json.map((item, index) => JSON.stringify(item)).join(", ")}]
                </p>
              )}

              {
                hexMenu && renderHex()
                // (
                //   <pre
                //     style={{
                //       background: "#f5f5f5",
                //       padding: "10px",
                //       fontFamily: "monospace",
                //       borderRadius: "5px",
                //       overflowX: "auto",
                //     }}
                //   >
                //     {jsonLines.map((line, index) => (
                //       <div
                //         key={index}
                //         style={{ display: "flex", marginBottom: "5px" }}
                //       >
                //         <span
                //           style={{
                //             color: "#888",
                //             paddingRight: "10px",
                //             fontWeight: "bold",
                //           }}
                //         >
                //           {index + 1}
                //         </span>
                //         <span>{line}</span>
                //       </div>
                //     ))}
                //   </pre>
                // )
              }

              {
                base64Menu && renderBase64()
                // (
                //   <pre
                //     style={{
                //       background: "#f5f5f5",
                //       padding: "10px",
                //       fontFamily: "monospace",
                //       borderRadius: "5px",
                //       overflowX: "auto",
                //     }}
                //   >
                //     {jsonLines.map((line, index) => (
                //       <div
                //         key={index}
                //         style={{ display: "flex", marginBottom: "5px" }}
                //       >
                //         <span
                //           style={{
                //             color: "#888",
                //             paddingRight: "10px",
                //             fontWeight: "bold",
                //           }}
                //         >
                //           {index + 1}
                //         </span>
                //         <span>{line}</span>
                //       </div>
                //     )
                //     )}
                //   </pre>
                // )
              }
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResponseBody;
