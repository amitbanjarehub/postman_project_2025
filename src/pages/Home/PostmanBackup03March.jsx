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
  import axios from "axios";
  
  const Postman = ({
    rowData,
    initialData,
    setInitialData,
    trigredMethod,
    setTrigredMethod,
    trigredFileName,
    setTrigredFileName,
  }) => {
    // console.log("initialData:------------>>>", initialData);
    const [localData, setLocalData] = useState([]);
    const [localData1, setLocalData1] = useState([]);
    const [apiMethod, setApiMethod] = useState(localData?.apiMethod || "GET");
    const [urlData, setUrlData] = useState(localData?.url || "");
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
    const [selectedRows2, setSelectedRows2] = useState(initialData?.bodyFormData); // Moved state here
    const [selectedRows3, setSelectedRows3] = useState(initialData?.bodyFormData); // Moved state here
    const [formData, setFormData] = useState([]); // Moved state here
    const [formData2, setFormData2] = useState([]); // Moved state here
    const [urlEncodedData, setUrlEncodedData] = useState([]); // Moved state here
    const [urlEncodedData2, setUrlEncodedData2] = useState([]);
    const [urlEncodedData3, setUrlEncodedData3] = useState([]);
    const [urlEncodedData4, setUrlEncodedData4] = useState(
      initialData?.bodyEncoddedRows
    );
    // const [bodyType, setBodyType] = useState("none");
    const [requestBodyData, setRequestBodyData] = useState({});
    // const [raw, setRaw] = useState("JSON");
    const [authoriziedType, setAuthoriziedType] = useState(
      initialData?.authoriziedType
    );
    const [authData1, setAuthData1] = useState(initialData?.authData);
    const [headerJsonData, setHeaderJsonData] = useState([]);
    const [bodyBinaryFileName, setBodyBinaryFileName] = useState({}); // State to store file name
    const [imgFiles, setImgFiles] = useState([]); // State to hold image files
    const [rawData, setRawData] = useState({}); // State to hold raw text data
    const [headerHiddenRows, setHeaderHiddenRows] = useState([]);
    const [headersJsonData1, setHeadersJsonData1] = useState([]);
    // State to track whether we're in edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState(rowData?.fileName);
    const [localData3, setLocalData3] = useState(rowData?.fileName);
    
    // Handle the click on the Typography to enter edit mode
    const handleTypographyClick = () => {
      setIsEditing(true);
    };
  
    // Handle saving the new value
    const handleSave = () => {
      // Logic to save the value to the local database
      // For example, if you are saving to localStorage:
      // localStorage.setItem("fileName", newFileName);
  
      // After saving, switch back to the Typography view
      setIsEditing(false);
    };
  
    const updateFileNameInLocalStorage = (rowData, fileName) => {
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
                name: fileName,
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
  
    // Handle the change in the TextField
    const handleTextFieldChange = (e) => {
      const fileName = e.target.value;
      setNewFileName(fileName);
      updateFileNameInLocalStorage(rowData, fileName);
      setTrigredFileName(fileName);
    };
  
    useEffect(()=>{
       // Check if the specific row's data exists in localStorage
       const storedData = JSON.parse(localStorage.getItem("collectionData"));
       if (storedData) {
         // Find the collection and file based on rowData's parentRowId and childRowId
         storedData.forEach((collection) => {
           if (collection.id === rowData.parentRowId) {
             collection.files.forEach((file) => {
               if (file.id === rowData.childRowId) {
                 
                 setLocalData3(file);
                 setNewFileName(file?.name)
               }
             });
           }
         });
       }
    },[rowData,trigredFileName])
  
    // Handle "Enter" key press to save the value
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSave();
      }
    };
  
    // const [bodyBinaryFileName, setBodyBinaryFileName] = useState(() => {
    //   const storedBinaryImg = localStorage.getItem("binaryImg");
    //   return storedBinaryImg || ""; // Default to "noAuth" if it's not in localStorage
    // });
  
    // const [authoriziedType, setAuthoriziedType] = useState(() => {
    //   const storedAuthType = localStorage.getItem("authorizedType");
    //   return storedAuthType || "noAuth"; // Default to "noAuth" if it's not in localStorage
    // });
  
    // console.log("localData1:---------->>>", localData1);
    console.log("localData3:----------->>>", localData3)
  
    useEffect(() => {
      const updateBodyFormData = (selectedRows3) => {
        const collectionData = JSON.parse(localStorage.getItem("collectionData"));
        let rowsToSave = selectedRows3; // Filter out the last row
        // Ensure that the file object is preserved in rowsToSave (store file data as properties)
        rowsToSave = rowsToSave.map((row) => ({
          ...row,
          file: row.file
            ? {
                name: row.file.name,
                lastModified: row.file.lastModified,
                size: row.file.size,
                type: row.file.type,
              }
            : {}, // If there's no file, set it as an empty object
        }));
  
        const updatedCollectionData = collectionData.map((collection) => {
          if (collection.id === rowData.parentRowId) {
            // Find the file inside the collection that matches childRowId
            const updatedItems = collection.files.map((file) => {
              if (file.id === rowData.childRowId) {
                // console.log("Found file with matching childRowId:", file);
  
                // Update bodyFormData in the correct file, excluding the last row
                return {
                  ...file,
                  items: file.items.map((item, index) => {
                    if (index === 0) {
                      // console.log(
                      //   "First item in file, updating bodyFormData:",
                      //   item
                      // );
                      return { ...item, bodyFormData: rowsToSave };
                    }
                    return item; // Return the item unchanged if it's not the first one
                  }),
                };
              }
              return file; // Return the file unchanged if it doesn't match
            });
  
            // Return updated collection with modified files
            return { ...collection, files: updatedItems };
          }
          return collection; // Return collection unchanged if it doesn't match
        });
  
        localStorage.setItem(
          "collectionData",
          JSON.stringify(updatedCollectionData)
        );
      };
      updateBodyFormData(selectedRows3);
    }, [selectedRows3]);
  
    useEffect(() => {
      const updateBodyFormData = (urlEncodedData4) => {
        const collectionData = JSON.parse(localStorage.getItem("collectionData"));
        let rowsToSave = urlEncodedData4; // Filter out the last row
        // Ensure that the file object is preserved in rowsToSave (store file data as properties)
        rowsToSave = rowsToSave.map((row) => ({
          ...row,
        }));
  
        const updatedCollectionData = collectionData.map((collection) => {
          if (collection.id === rowData.parentRowId) {
            // Find the file inside the collection that matches childRowId
            const updatedItems = collection.files.map((file) => {
              if (file.id === rowData.childRowId) {
                // Update bodyFormData in the correct file, excluding the last row
                return {
                  ...file,
                  items: file.items.map((item, index) => {
                    if (index === 0) {
                      return { ...item, bodyEncoddedRows: rowsToSave };
                    }
                    return item; // Return the item unchanged if it's not the first one
                  }),
                };
              }
              return file; // Return the file unchanged if it doesn't match
            });
  
            // Return updated collection with modified files
            return { ...collection, files: updatedItems };
          }
          return collection; // Return collection unchanged if it doesn't match
        });
  
        localStorage.setItem(
          "collectionData",
          JSON.stringify(updatedCollectionData)
        );
      };
      updateBodyFormData(urlEncodedData4);
    }, [urlEncodedData4]);
    // console.log("selectedRows3:-------------->>>>", selectedRows3);
    // console.log("urlEncodedData4:-------------->>>>", urlEncodedData4);
    // const [authData1, setAuthData1] = useState(() => {
    //   const storedAuthData = localStorage.getItem("authData");
    //   return storedAuthData ? JSON.parse(storedAuthData) : {}; // Default to empty object if not in localStorage
    // });
    // console.log("localData:=========>>>", localData?.urlText); //urlText
    // console.log("apiMethod:=========>>>", apiMethod);
    // console.log("headerJsonData112:=========>>>", headerJsonData);
  
    // const [bodyType, setBodyType] = useState(() => {
    //   const storedBodyType = localStorage.getItem("bodyType");
    //   return storedBodyType ? JSON.parse(storedBodyType) : "none"; // Default to "none" if not found
    // });
  
    const [bodyType, setBodyType] = useState(initialData?.bodyType);
    const [raw, setRaw] = useState(initialData?.rawType);
  
    // console.log("bodyType:=========>>>", bodyType);
    // const [raw, setRaw] = useState(() => {
    //   const storedRawType = localStorage.getItem("rawType");
    //   return storedRawType ? JSON.parse(storedRawType) : "JSON"; // Default to "none" if not found
    // });
    // console.log("initialData?.jsonData:----------->>>", initialData?.jsonData);
    const [jsonData, setJsonData] = useState(initialData?.jsonData);
    // console.log("jsonData:----------->>>", jsonData);
    // const [jsonData, setJsonData] = useState(() => {
    //   const savedJsonData = localStorage.getItem("jsonData");
    //   return savedJsonData ? JSON.parse(savedJsonData) : ""; // Default to empty string if no data in localStorage
    // });
  
    // Inside the Postman component
    useEffect(() => {
      // Check if the specific row's data exists in localStorage
      const storedData = JSON.parse(localStorage.getItem("collectionData"));
      if (storedData) {
        // Find the collection and file based on rowData's parentRowId and childRowId
        storedData.forEach((collection) => {
          if (collection.id === rowData.parentRowId) {
            collection.files.forEach((file) => {
              if (file.id === rowData.childRowId) {
                // Update the Postman fields with the current row's data
                // console.log("file.items[0]:---->>>", file.items[0])
                setAuthoriziedType(file.items[0]?.authoriziedType || "noAuth");
                setAuthData1(file.items[0]?.authData || {});
                setLocalData(file.items[0]);
                setLocalData1(file);
                setTrigredMethod(file.items[0]);
                setUrlData(file.items[0]?.url);
                setBodyType(file.items[0]?.bodyType);
                setRaw(file.items[0]?.rawType);
                setJsonData(file.items[0]?.jsonData);
              }
            });
          }
        });
      }
    }, [rowData, apiMethod, textString]); // Runs when rowData changes, ensuring fresh values for each row
  
    // console.log("initialData:------------>>>", initialData);
    // console.log("raw:------------>>>", raw);
    // console.log("authoriziedType:--------------->>>", authoriziedType);
    // console.log("authData1:--------------->>>", authData1);
    // Save `authorizedType` and `authData1` to localStorage whenever they change
    // useEffect(() => {
    //   // localStorage.setItem("binaryImg", JSON.stringify(bodyBinaryFileName));
    //   localStorage.setItem("jsonData", JSON.stringify(jsonData));
    //   localStorage.setItem("rawType", JSON.stringify(raw));
    //   localStorage.setItem("bodyType", JSON.stringify(bodyType));
    //   localStorage.setItem("authorizedType", authoriziedType); // No need for JSON.stringify since it's a string
    //   localStorage.setItem("authData", JSON.stringify(authData1)); // JSON.stringify for the object
    // }, [bodyType, authoriziedType, authData1, raw, jsonData]);
  
    let questionMark = "?";
  
    const updateApiMethodInLocalStorage = (rowData, newApiMethod) => {
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
                  index === 0 ? { ...item, apiMethod: newApiMethod } : item
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
  
    const handleChange = (event) => {
      const newApiMethod = event.target.value;
      setApiMethod(newApiMethod);
      // Call the function to update localStorage with the new apiMethod value
      updateApiMethodInLocalStorage(rowData, newApiMethod);
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
  
    // useEffect(()=>{}, [rowData])
  
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
  
    const updateUrlInLocalStorage = (rowData, newUrl) => {
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
                  index === 0 ? { ...item, url: newUrl } : item
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
  
    const handleQueryStringChange = (e) => {
      const newUrl = e.target.value;
      setTextString(newUrl);
      updateUrlInLocalStorage(rowData, newUrl);
    };
  
    useEffect(() => {
      if (bodyType === "form-data") {
        // console.log("form-data:--------->>>", formData2);
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
  
    const generateUniqueId = () =>
      Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method
    //useEffect for set header row data Header  component
    useEffect(() => {
      const updateHeaderHiddenRows = () => {
        const collectionData = JSON.parse(localStorage.getItem("collectionData"));
  
        collectionData.map((collection) => {
          if (collection.id === rowData.parentRowId) {
            // Find the file inside the collection that matches childRowId
            const updatedItems = collection.files.map((file) => {
              if (file.id === rowData.childRowId) {
                // Extract headerHiddenRows data
                const headerHiddenRowsData =
                  file.items[0]?.headerHiddenRows || [];
  
                // If bodyType is "form-data", add the Content-Type row
                if (bodyType === "form-data") {
                  const contentTypeRow = {
                    id: generateUniqueId(),
                    key: "Content-Type",
                    value: "multipart/form-data",
                    description: "",
                    checked: true,
                  };
  
                  // Insert the row before the last one (before the last row)
                  const updatedHeaderRows = [
                    ...headerHiddenRowsData.slice(
                      0,
                      headerHiddenRowsData.length - 1
                    ),
                    contentTypeRow,
                    ...headerHiddenRowsData.slice(
                      headerHiddenRowsData.length - 1
                    ),
                  ];
  
                  // Store the updated rows in state
                  setHeaderHiddenRows(updatedHeaderRows);
                } else if (bodyType !== "form-data") {
                  // If bodyType is not "form-data", remove the Content-Type row if it exists
                  const updatedHeaderRows = headerHiddenRowsData.filter(
                    (row) => row.key !== "Content-Type"
                  );
  
                  // Store the updated rows in state
                  setHeaderHiddenRows(updatedHeaderRows);
                }
  
                // Return the file without any changes
                return file;
              }
              return file;
            });
  
            // Return updated collection (no further changes to items)
            return { ...collection, files: updatedItems };
          }
          return collection;
        });
      };
  
      updateHeaderHiddenRows();
    }, [bodyType, rowData]); // Depend on bodyType and rowData
  
    //useEffect for set header json data for request
    useEffect(() => {
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
  
      const result = transformToJson(headerHiddenRows);
  
      let finalHeaders;
      if (bodyType === "binary") {
        finalHeaders = { "Content-Type": "image/webp" };
      } else if (bodyType === "form-data") {
        finalHeaders = { "Content-Type": "multipart/form-data" };
        // finalHeaders = { "Content-Type": "application/json" };
        // finalHeaders = {};
      } else {
        finalHeaders = { "Content-Type": "application/json" };
      }
  
      // Merge the static headers with the result data headers
      let headers = { ...result, ...finalHeaders };
  
      const updateRequestHeaderLocalStorage = (rowData, headers) => {
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
                          headers: [headers],
                          bodyType: bodyType,
                          rawType: raw,
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
  
      updateRequestHeaderLocalStorage(rowData, headers);
  
      setHeadersJsonData1(headers);
    }, [bodyType, headerHiddenRows, rowData, raw]);
  
    // console.log("headersJsonData1111:---------------->>>>>", headersJsonData1);
  
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
        finalHeaders = { "Content-Type": "multipart/form-data" };
        // finalHeaders = { "Content-Type": "application/json" };
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
          if (bodyType === "form-data") {
            const formData = new FormData();
  
            // Appending multiple files
            Array.from(imgFiles).forEach((file) => {
              formData.append("imgFiles", file); // 'imgFiles' key for each file
            });
  
            // Appending JSON data
            // formData.append("rawData", JSON.stringify(rawData)); // rawData as JSON string
            Object.keys(rawData).forEach((key) => {
              formData.append(key, rawData[key]); // Appending rawData key-value pairs
            });
  
            response = await axios.post(url, formData, {
              headers: headers,
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
        // console.log("response44", response);
        // Check if the response is successful
        if (response.ok || response.status === 200) {
          let data;
          if (bodyType === "form-data") {
            data = response.data;
          } else {
            data = await response.json();
          }
  
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
  
    // console.log("imgFiles69:==========>>>", imgFiles);
    // console.log("rawData69:==========>>>", rawData);
    // console.log("apiMethod:------------>>>>", apiMethod);
    // console.log("jsonData121:-------------->>>", jsonData);
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
                component="div" // Change the component to div
                sx={{
                  color: "text.primary",
                  display: "flex",
                  fontSize: "12px",
                  alignItems: "center",
                }}
                onClick={handleTypographyClick}
              >
                {isEditing ? (
                  <TextField
                    value={newFileName}
                    onChange={handleTextFieldChange}
                    onBlur={handleSave} // Save when the TextField loses focus
                    onKeyPress={handleKeyPress} // Save on "Enter" key press
                    autoFocus
                    variant="outlined"
                    size="small"
                    sx={{
                      fontSize: "12px",
                      width: "150px",
                      height: "20px",
                    }}
                  />
                ) : (
                  <>
                    {/* {rowData?.fileName} */}
                    {localData3?.name || rowData?.fileName}
                    {/* {"----"} */}
                    {/* {rowData?.childRowId} */}
                  </>
                )}
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
                <Select
                  value={localData.apiMethod || apiMethod}
                  onChange={handleChange}
                  size="small"
                >
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
                // value={
                //   queryString && queryString.length > 0
                //     ? `${textString}?${queryString}`
                //     : textString
                // }
                value={
                  queryString && queryString.length > 0
                    ? `${urlData}?${queryString}`
                    : urlData || ""
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
                    rowData={rowData}
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
                    imgFiles={imgFiles}
                    rawData={rawData}
                    setImgFiles={setImgFiles}
                    setRawData={setRawData}
                    rowData={rowData}
                    initialData={initialData}
                    localData={localData}
                    selectedRows3={selectedRows3}
                    setSelectedRows3={setSelectedRows3}
                    urlEncodedData4={urlEncodedData4}
                    setUrlEncodedData4={setUrlEncodedData4}
                  />
                )}
                {headersMenu && (
                  <Headers
                    headerJsonData={headerJsonData}
                    setHeaderJsonData={setHeaderJsonData}
                    bodyType={bodyType}
                    raw={raw}
                    rowData={rowData}
                    headerHiddenRows={headerHiddenRows}
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
  