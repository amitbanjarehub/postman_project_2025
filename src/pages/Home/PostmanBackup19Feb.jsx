import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import Breadcrumbs from "@mui/material/Breadcrumbs";
  import { Link } from "react-router-dom";
  import Params from "./Params";
  import Authorization from "./Authorization";
  import Settings from "./Settings";
  import Body from "./Body";
  import Headers from "./Headers";
  import Scripts from "./Scripts";
  import JSONWithLineNumbers from "./JSONWithLineNumbers";
  import ReactJson from "react-json-view";
  const Postman = ({ rowData }) => {
    // console.log("rowData:------------>>>", rowData);
    const [apiMethod, setApiMethod] = useState("GET");
    const [paramsMenu, setParamsMenu] = useState(true);
    const [authorizationMenu, setAuthorizationMenu] = useState(false);
    const [headersMenu, setHeadersMenu] = useState(false);
    const [bodyMenu, setBodyMenu] = useState(false);
    const [scriptsMenu, setScriptsMenu] = useState(false);
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Lifted state
    const [queryString, setQueryString] = useState("");
    const [textString, setTextString] = useState("");
    const [responseData, setResponseData] = useState([]);
    // const [jsonData, setJsonData] = useState(""); // Lifted state for jsonData
    const [selectedRows2, setSelectedRows2] = useState([]); // Moved state here
    const [formData, setFormData] = useState([]); // Moved state here
    const [formData2, setFormData2] = useState([]); // Moved state here
    const [urlEncodedData, setUrlEncodedData] = useState([]); // Moved state here
    const [urlEncodedData2, setUrlEncodedData2] = useState([]);
    const [urlEncodedData3, setUrlEncodedData3] = useState([]);
    // const [bodyType, setBodyType] = useState("none");
    const [requestBodyData, setRequestBodyData] = useState({});
    // const [raw, setRaw] = useState("JSON");
    // const [authoriziedType, setAuthoriziedType] = useState("noAuth");
    // const [authData1, setAuthData1] = useState({});
    const [headerJsonData, setHeaderJsonData] = useState([]);
    const [bodyBinaryFileName, setBodyBinaryFileName] = useState({}); // State to store file name
    const [formData1, setFormData1] = useState({}); // To store form data
    // const [bodyBinaryFileName, setBodyBinaryFileName] = useState(() => {
    //   const storedBinaryImg = localStorage.getItem("binaryImg");
    //   return storedBinaryImg || ""; // Default to "noAuth" if it's not in localStorage
    // });
  
    const [authoriziedType, setAuthoriziedType] = useState(() => {
      const storedAuthType = localStorage.getItem("authorizedType");
      return storedAuthType || "noAuth"; // Default to "noAuth" if it's not in localStorage
    });
  
    const [authData1, setAuthData1] = useState(() => {
      const storedAuthData = localStorage.getItem("authData");
      return storedAuthData ? JSON.parse(storedAuthData) : {}; // Default to empty object if not in localStorage
    });
  
    const [bodyType, setBodyType] = useState(() => {
      const storedBodyType = localStorage.getItem("bodyType");
      return storedBodyType ? JSON.parse(storedBodyType) : "none"; // Default to "none" if not found
    });
  
    const [raw, setRaw] = useState(() => {
      const storedRawType = localStorage.getItem("rawType");
      return storedRawType ? JSON.parse(storedRawType) : "JSON"; // Default to "none" if not found
    });
  
    const [jsonData, setJsonData] = useState(() => {
      const savedJsonData = localStorage.getItem("jsonData");
      return savedJsonData ? JSON.parse(savedJsonData) : ""; // Default to empty string if no data in localStorage
    });
  
    // Save `authorizedType` and `authData1` to localStorage whenever they change
    useEffect(() => {
      // localStorage.setItem("binaryImg", JSON.stringify(bodyBinaryFileName));
      localStorage.setItem("jsonData", JSON.stringify(jsonData));
      localStorage.setItem("rawType", JSON.stringify(raw));
      localStorage.setItem("bodyType", JSON.stringify(bodyType));
      localStorage.setItem("authorizedType", authoriziedType); // No need for JSON.stringify since it's a string
      localStorage.setItem("authData", JSON.stringify(authData1)); // JSON.stringify for the object
    }, [bodyType, authoriziedType, authData1, raw, jsonData]);
  
    let questionMark = "?";
  
    const handleChange = (event) => {
      setApiMethod(event.target.value);
    };
  
    // Update selected rows in the state
    const handleSelectedRowsChange = (selected) => {
      setSelectedRows(selected);
    };
  
    // Update query string whenever selected rows change
    useEffect(() => {
      setQueryString(
        selectedRows
          .map(
            (row) =>
              `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`
          )
          .join("&")
      );
    }, [selectedRows]);
  
    useEffect(() => {
      const createJsonData = (selectedRows) => {
        let jsonData = {};
  
        selectedRows.forEach((row) => {
          if (row.checked) {
            if (row.keyField === "TEXT") {
              jsonData[row.key] = row.value; // Set the value if keyField is TEXT
            } else if (row.keyField === "FILES") {
              jsonData[row.key] = row.file; // Set the file if keyField is FILES
            }
          }
        });
  
        return jsonData;
      };
  
      if (selectedRows2.length !== 0) {
        setFormData(createJsonData(selectedRows2));
      } else {
        setFormData(0);
      }
      // setFormData(createJsonData(selectedRows2));
    }, [selectedRows2]);
  
    useEffect(() => {
      const createJsonData = (selectedRows) => {
        let jsonData = {};
  
        selectedRows.forEach((row) => {
          if (row.checked) {
            jsonData[row.key] = row.value; // Set the value if keyField is TEXT
          }
        });
  
        return jsonData;
      };
  
      if (urlEncodedData.length !== 0) {
        setUrlEncodedData2(createJsonData(urlEncodedData));
      } else {
        setUrlEncodedData2(0);
      }
      // setUrlEncodedData2(createJsonData(urlEncodedData));
    }, [urlEncodedData]);
  
    // This is to view the json data in console
    useEffect(() => {
      // console.log("Formatted jsonData:", JSON.stringify(formData, null, 2)); // Prettify the json
      setFormData2(JSON.stringify(formData, null, 2));
    }, [formData]);
  
    useEffect(() => {
      // console.log("Formatted jsonData:", JSON.stringify(formData, null, 2)); // Prettify the json
      setUrlEncodedData3(JSON.stringify(urlEncodedData2, null, 2));
    }, [urlEncodedData2]);
  
    const handleParams = () => {
      setAuthorizationMenu(false);
      setHeadersMenu(false);
      setBodyMenu(false);
      setScriptsMenu(false);
      setSettingsMenu(false);
      setParamsMenu(true);
    };
  
    const handleAuthorization = () => {
      setParamsMenu(false);
      setHeadersMenu(false);
      setBodyMenu(false);
      setScriptsMenu(false);
      setSettingsMenu(false);
      setAuthorizationMenu(true);
    };
  
    const handleHeaders = () => {
      setParamsMenu(false);
      setAuthorizationMenu(false);
      setBodyMenu(false);
      setScriptsMenu(false);
      setSettingsMenu(false);
      setHeadersMenu(true);
    };
  
    const handleBody = () => {
      setParamsMenu(false);
      setAuthorizationMenu(false);
      setHeadersMenu(false);
      setScriptsMenu(false);
      setSettingsMenu(false);
      setBodyMenu(true);
    };
  
    const handleScripts = () => {
      setParamsMenu(false);
      setAuthorizationMenu(false);
      setHeadersMenu(false);
      setBodyMenu(false);
      setSettingsMenu(false);
      setScriptsMenu(true);
    };
  
    const handleSettings = () => {
      setParamsMenu(false);
      setAuthorizationMenu(false);
      setHeadersMenu(false);
      setBodyMenu(false);
      setScriptsMenu(false);
      setSettingsMenu(true);
    };
  
    const handleQueryStringChange = (e) => {
      setTextString(e.target.value);
    };
  
    useEffect(() => {
      if (bodyType === "form-data") {
        console.log("form-data:--------->>>", formData2);
        setRequestBodyData(formData2 !== "0" ? formData2 : {});
      } else if (bodyType === "x-www-form-urlencoded") {
        setRequestBodyData(urlEncodedData3 !== "0" ? urlEncodedData3 : {});
      } else if (bodyType === "binary") {
        setRequestBodyData({});
      } else if (bodyType === "GraphQL") {
        setRequestBodyData({});
      } else if (bodyType === "raw") {
        setRequestBodyData(Object.keys(jsonData).length !== 0 ? jsonData : {});
      } else if (bodyType === "binary") {
        setRequestBodyData(bodyBinaryFileName);
      } else {
        setRequestBodyData({});
      }
    }, [
      bodyType,
      setRequestBodyData,
      formData2,
      urlEncodedData3,
      jsonData,
      bodyBinaryFileName,
    ]);
  
    const handleSend = async () => {
      // Function to generate a unique ID for each row (UUID)
      const generateUniqueId = () =>
        Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method
  
      // Combine the textString and queryString into finalQueryString
      const finalQueryString =
        textString + (queryString ? `?${queryString}` : "");
  
      // Log the API Method and final URL for debugging
      console.log("API Method:", apiMethod);
      console.log("Final Query String:", finalQueryString);
  
      // Construct the full URL using your base URL
      // const baseUrl = "http://localhost:5000/api/template"; // Your base API URL
      const url = `${finalQueryString}`;
  
      console.log("url:-------------->>>>", url);
  
      let requestBody2 =
        Object.keys(jsonData).length !== 0
          ? jsonData
          : formData2 !== "0"
          ? formData2
          : urlEncodedData3 !== "0"
          ? urlEncodedData3
          : {};
  
      // Function to convert the array into the desired JSON format
      const transformToJson = (data) => {
        const transformedData = {};
  
        // Loop through the array and populate the object
        data.forEach((item) => {
          if (item.key && item.value) {
            // If the key is "VertexSuite-Token", set a unique token
            if (item.key === "VertexSuite-Token") {
              transformedData[item.key] = generateUniqueId(); // Generate unique token
            } else {
              transformedData[item.key] = item.value; // Otherwise, set the value as it is
            }
          }
        });
  
        return transformedData;
      };
  
      const result = transformToJson(headerJsonData);
  
      // let finalHeaders = { "Content-Type": "application/json" };
  
      let finalHeaders;
      if (bodyType === "binary") {
        finalHeaders = { "Content-Type": "image/webp" };
      } else if (bodyType === "form-data") {
        // finalHeaders = { "Content-Type": "multipart/form-data" };
        finalHeaders = { "Content-Type": "application/json" };
        // finalHeaders = {};
      } else {
        finalHeaders = { "Content-Type": "application/json" };
      }
  
      // Merge the static headers with the result data headers
      let headers = { ...result, ...finalHeaders };
  
      switch (authoriziedType) {
        case "basicAuth":
          if (!authData1?.userName || !authData1?.userPassword) {
            console.error("Username or Password is missing");
            return;
          }
          // Basic Auth encoding
          headers["Authorization"] =
            "Basic " + btoa(authData1?.userName + ":" + authData1?.userPassword);
          break;
        case "bearerToken":
          if (!authData1?.tokenData) {
            console.error("Token is missing");
            return;
          }
          headers["Authorization"] = "Bearer " + authData1?.tokenData;
          break;
        case "apiKey":
          if (!authData1.apiKey) {
            console.error("API Key is missing");
            return;
          }
          headers["x-api-key"] = authData1.apiKey;
          break;
        // Add cases for other auth types
        default:
          break;
      }
  
      // console.log("requestBodyData:----------->>>", requestBodyData);
  
      try {
        let response;
        if (apiMethod === "GET") {
          response = await fetch(url, {
            method: "GET",
            headers: headers,
          });
        } else if (apiMethod === "POST") {
          console.log("formData1221:------->>", formData1);
          if (bodyType === "form-data") {
            const formData = new FormData();
            Object.keys(formData1).forEach((key) => {
              const value = formData1[key];
  
              // If value is an image (object containing file data)
              if (value && value.name && value.size) {
                // Here, we append the image to FormData using the dynamic key (image, image2, etc.)
                formData.append(key, value); // Image will be appended to FormData as 'key' (e.g., image, image2, etc.)
              }
              // If it's text data, append it as key-value pairs
              else if (typeof value === "string") {
                formData.append(key, value); // Text data will be added with 'key' (e.g., name, age, class)
              }
            });
  
            // Log FormData contents
            for (let pair of formData.entries()) {
              console.log(pair[0] + ": " + pair[1]);
            }
  
            // console.log("FormData to be sent:", formData);
  
            response = await fetch(url, {
              method: "POST",
              // headers: headers,
              body: formData, // send the FormData as body
            });
          } else {
            response = await fetch(url, {
              method: "POST",
              headers: headers,
              body: requestBodyData,
            });
          }
        } else if (apiMethod === "PUT") {
          response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: requestBodyData,
          });
        } else if (apiMethod === "DELETE") {
          response = await fetch(url, {
            method: "DELETE",
            headers: headers,
            body: requestBodyData,
          });
        } else {
          console.error("Unsupported method:", apiMethod);
          return;
        }
  
        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          console.log("Response Data:", data);
          setResponseData(data);
        } else {
          console.error("Error fetching data:", response);
          setResponseData(response);
        }
      } catch (error) {
        console.error("Request failed:", error);
        setResponseData(error);
      }
    };
  
    // console.log("formData1:------------>>>", formData1);
  
    return (
      <Stack
        sx={{
          border: "1px solid blue",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* File name and method name */}
        <Stack sx={{ border: "1px solid red", height: "4%" }}>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Stack sx={{ display: "flex", fontSize: "12px" }}>
              {" "}
              {rowData?.fileMethod}
            </Stack>
            <Stack sx={{ display: "flex", fontSize: "12px" }}>
              {rowData?.fileName}
            </Stack>
          </Stack>
        </Stack>
        {/*Breadcrumns Folder name & File name and Save button */}
        <Stack sx={{ border: "1px solid blue", height: "4%" }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                color="inherit"
                sx={{ display: "flex", fontSize: "12px", alignItems: "center" }}
              >
                {rowData?.parentRowName}
              </Typography>
              <Typography
                sx={{
                  color: "text.primary",
                  display: "flex",
                  fontSize: "12px",
                  alignItems: "center",
                }}
              >
                {rowData?.fileName}
              </Typography>
            </Breadcrumbs>
  
            <Stack
              sx={{ display: "flex", flexDirection: "row", marginRight: "8px" }}
            >
              <Stack sx={{ fontSize: "12px" }}>Save</Stack>
            </Stack>
          </Stack>
        </Stack>
        {/*Api Calling */}
        <Stack
          sx={{
            border: "2px solid green",
            height: "62%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Api header */}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "6%",
            }}
          >
            <Stack sx={{ width: "10%" }}>
              <FormControl fullWidth>
                <Select value={apiMethod} onChange={handleChange} size="small">
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                  <MenuItem value="HEAD">HEAD</MenuItem>
                  <MenuItem value="OPTION">OPTION</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack sx={{ width: "80%" }}>
              <TextField
                size="small"
                value={
                  queryString && queryString.length > 0
                    ? `${textString}?${queryString}`
                    : textString
                }
                onChange={handleQueryStringChange}
                fullWidth
              />
            </Stack>
            <Stack sx={{ width: "10%" }}>
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </Stack>
          </Stack>
  
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "94%",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "12px",
                height: "4%",
                gap: 2,
              }}
            >
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: paramsMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleParams}
              >
                Params
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: authorizationMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleAuthorization}
              >
                Authorization
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: headersMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleHeaders}
              >
                Headers
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: bodyMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleBody}
              >
                Body
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: scriptsMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleScripts}
              >
                Script
              </Stack>
              <Stack
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: settingsMenu ? "2px solid #1c90fc" : "none",
                }}
                onClick={handleSettings}
              >
                Setting
              </Stack>
            </Stack>
            {/* Header values */}
            <Stack sx={{ height: "96%" }}>
              <Stack sx={{ height: "100%" }}>
                {paramsMenu && (
                  <Params
                    selectedRows={selectedRows}
                    handleSelectedRowsChange={handleSelectedRowsChange}
                  />
                )}
  
                {authorizationMenu && (
                  <Authorization
                    authoriziedType={authoriziedType}
                    setAuthoriziedType={setAuthoriziedType}
                    authData1={authData1}
                    setAuthData1={setAuthData1}
                  />
                )}
                {settingsMenu && <Settings />}
                {scriptsMenu && <Scripts />}
                {bodyMenu && (
                  <Body
                    bodyType={bodyType}
                    setBodyType={setBodyType}
                    jsonData={jsonData}
                    setJsonData={setJsonData}
                    selectedRows2={selectedRows2}
                    setSelectedRows2={setSelectedRows2}
                    urlEncodedData={urlEncodedData}
                    setUrlEncodedData={setUrlEncodedData}
                    raw={raw}
                    setRaw={setRaw}
                    bodyBinaryFileName={bodyBinaryFileName}
                    setBodyBinaryFileName={setBodyBinaryFileName}
                    formData1={formData1}
                    setFormData1={setFormData1}
                  />
                )}
                {headersMenu && (
                  <Headers
                    headerJsonData={headerJsonData}
                    setHeaderJsonData={setHeaderJsonData}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/*Api Response */}
        <Stack sx={{ border: "1px solid red", height: "30%" }}>
          <Stack sx={{ overflowY: "auto" }}>
            {" "}
            <JSONWithLineNumbers json={responseData} />
          </Stack>
        </Stack>
      </Stack>
    );
  };
  
  export default Postman;
  