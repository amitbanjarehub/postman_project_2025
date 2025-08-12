// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { Link } from "react-router-dom";
// import Params from "./Params";
// import Authorization from "./Authorization";
// import Settings from "./Settings";
// import Body from "./Body";
// import Headers from "./Headers";
// import Scripts from "./Scripts";
// import JSONWithLineNumbers from "./JSONWithLineNumbers";
// import ReactJson from "react-json-view";
// import axios from "axios";

// const Postman = ({
//   rowData,
//   initialData,
//   setInitialData,
//   trigredMethod,
//   setTrigredMethod,
//   trigredFileName,
//   setTrigredFileName,
// }) => {
//   // console.log("initialData:------------>>>", initialData);
//   const [localData, setLocalData] = useState([]);
//   const [errorLogDataValue, setErrorLogDataValue] = useState([]);
//   const [localData1, setLocalData1] = useState([]);
//   const [apiMethod, setApiMethod] = useState(localData?.apiMethod || "GET");
//   const [urlData, setUrlData] = useState(localData?.url || "");
//   const [paramsMenu, setParamsMenu] = useState(true);
//   const [authorizationMenu, setAuthorizationMenu] = useState(false);
//   const [headersMenu, setHeadersMenu] = useState(false);
//   const [bodyMenu, setBodyMenu] = useState(false);
//   const [scriptsMenu, setScriptsMenu] = useState(false);
//   const [settingsMenu, setSettingsMenu] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]); // Lifted state
//   const [queryString, setQueryString] = useState("");
//   const [textString, setTextString] = useState("");
//   const [responseData, setResponseData] = useState([]);
//   const [responseTime, setResponseTime] = useState(null);
//   const [lastCallTime, setLastCallTime] = useState(null);
//   const [responseFormat, setResponseFormat] = useState("json"); // Default to JSON format
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [errorApi, setErrorAPI] = useState(null);
//   const [statusCode, setStatusCode] = useState(null);
//   const [responseSize, setResponseSize] = useState(null);
//   // const [jsonData, setJsonData] = useState(""); // Lifted state for jsonData
//   const [selectedRows2, setSelectedRows2] = useState(initialData?.bodyFormData); // Moved state here
//   const [selectedRows3, setSelectedRows3] = useState(initialData?.bodyFormData); // Moved state here
//   const [formData, setFormData] = useState([]); // Moved state here
//   const [formData2, setFormData2] = useState([]); // Moved state here
//   const [urlEncodedData, setUrlEncodedData] = useState([]); // Moved state here
//   const [urlEncodedData2, setUrlEncodedData2] = useState([]);
//   const [urlEncodedData3, setUrlEncodedData3] = useState([]);
//   const [urlEncodedData4, setUrlEncodedData4] = useState(
//     initialData?.bodyEncoddedRows
//   );
//   // const [bodyType, setBodyType] = useState("none");
//   const [requestBodyData, setRequestBodyData] = useState({});
//   // const [raw, setRaw] = useState("JSON");
//   const [authoriziedType, setAuthoriziedType] = useState(
//     initialData?.authoriziedType
//   );
//   const [authData1, setAuthData1] = useState(initialData?.authData);
//   const [headerJsonData, setHeaderJsonData] = useState([]);
//   const [bodyBinaryFileName, setBodyBinaryFileName] = useState({}); // State to store file name
//   const [imgFiles, setImgFiles] = useState([]); // State to hold image files
//   const [rawData, setRawData] = useState({}); // State to hold raw text data
//   const [headerHiddenRows, setHeaderHiddenRows] = useState([]);
//   const [headersJsonData1, setHeadersJsonData1] = useState([]);

//   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX This code for request name and request method in left menu side XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//   // State to track whether we're in edit mode
//   const [isEditing, setIsEditing] = useState(false);
//   const [newFileName, setNewFileName] = useState(rowData?.fileName);
//   const [localData3, setLocalData3] = useState(rowData?.fileName);

//   // Handle the click on the Typography to enter edit mode
//   const handleTypographyClick = () => {
//     setIsEditing(true);
//   };

//   // Handle saving the new value
//   const handleSave = () => {
//     // After saving, switch back to the Typography view
//     setIsEditing(false);
//   };

//   const updateFileNameInLocalStorage = (rowData, fileName) => {
//     // Get the current collection data from localStorage
//     const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//     // Find the collection that matches the parentRowId
//     const updatedCollectionData = collectionData.map((collection) => {
//       if (collection.id === rowData.parentRowId) {
//         // Find the file inside the collection that matches childRowId
//         const updatedItems = collection.files.map((file) => {
//           if (file.id === rowData.childRowId) {
//             // Update apiMethod in the correct file
//             return {
//               ...file,
//               name: fileName,
//             };
//           }
//           return file;
//         });

//         // Return updated collection with modified files
//         return { ...collection, files: updatedItems };
//       }
//       return collection;
//     });

//     // Save the updated collection back to localStorage
//     localStorage.setItem(
//       "collectionData",
//       JSON.stringify(updatedCollectionData)
//     );
//   };

//   // Handle the change in the TextField
//   const handleTextFieldChange = (e) => {
//     const fileName = e.target.value;
//     setNewFileName(fileName);
//     updateFileNameInLocalStorage(rowData, fileName);
//     setTrigredFileName(fileName);
//   };

//   useEffect(() => {
//     // Check if the specific row's data exists in localStorage
//     const storedData = JSON.parse(localStorage.getItem("collectionData"));
//     if (storedData) {
//       // Find the collection and file based on rowData's parentRowId and childRowId
//       storedData.forEach((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           collection.files.forEach((file) => {
//             if (file.id === rowData.childRowId) {
//               setLocalData3(file);
//               setNewFileName(file?.name);
//             }
//           });
//         }
//       });
//     }
//   }, [rowData, trigredFileName]);

//   // Handle "Enter" key press to save the value
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSave();
//     }
//   };
//   // XXXXXXXXXXXXXXXXXXThis code for request name and request method in left menu sideXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//   // console.log("localData3:----------->>>", localData3)

//   useEffect(() => {
//     const updateBodyFormData = (selectedRows3) => {
//       const collectionData = JSON.parse(localStorage.getItem("collectionData"));
//       let rowsToSave = selectedRows3; // Filter out the last row
//       // Ensure that the file object is preserved in rowsToSave (store file data as properties)
//       rowsToSave = rowsToSave.map((row) => ({
//         ...row,
//         file: row.file
//           ? {
//               name: row.file.name,
//               lastModified: row.file.lastModified,
//               size: row.file.size,
//               type: row.file.type,
//             }
//           : {}, // If there's no file, set it as an empty object
//       }));

//       const updatedCollectionData = collectionData.map((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           // Find the file inside the collection that matches childRowId
//           const updatedItems = collection.files.map((file) => {
//             if (file.id === rowData.childRowId) {
//               // console.log("Found file with matching childRowId:", file);

//               // Update bodyFormData in the correct file, excluding the last row
//               return {
//                 ...file,
//                 items: file.items.map((item, index) => {
//                   if (index === 0) {
//                     // console.log(
//                     //   "First item in file, updating bodyFormData:",
//                     //   item
//                     // );
//                     return { ...item, bodyFormData: rowsToSave };
//                   }
//                   return item; // Return the item unchanged if it's not the first one
//                 }),
//               };
//             }
//             return file; // Return the file unchanged if it doesn't match
//           });

//           // Return updated collection with modified files
//           return { ...collection, files: updatedItems };
//         }
//         return collection; // Return collection unchanged if it doesn't match
//       });

//       localStorage.setItem(
//         "collectionData",
//         JSON.stringify(updatedCollectionData)
//       );
//     };
//     updateBodyFormData(selectedRows3);
//   }, [selectedRows3]);

//   useEffect(() => {
//     const updateBodyFormData = (urlEncodedData4) => {
//       const collectionData = JSON.parse(localStorage.getItem("collectionData"));
//       let rowsToSave = urlEncodedData4; // Filter out the last row
//       // Ensure that the file object is preserved in rowsToSave (store file data as properties)
//       rowsToSave = rowsToSave.map((row) => ({
//         ...row,
//       }));

//       const updatedCollectionData = collectionData.map((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           // Find the file inside the collection that matches childRowId
//           const updatedItems = collection.files.map((file) => {
//             if (file.id === rowData.childRowId) {
//               // Update bodyFormData in the correct file, excluding the last row
//               return {
//                 ...file,
//                 items: file.items.map((item, index) => {
//                   if (index === 0) {
//                     return { ...item, bodyEncoddedRows: rowsToSave };
//                   }
//                   return item; // Return the item unchanged if it's not the first one
//                 }),
//               };
//             }
//             return file; // Return the file unchanged if it doesn't match
//           });

//           // Return updated collection with modified files
//           return { ...collection, files: updatedItems };
//         }
//         return collection; // Return collection unchanged if it doesn't match
//       });

//       localStorage.setItem(
//         "collectionData",
//         JSON.stringify(updatedCollectionData)
//       );
//     };
//     updateBodyFormData(urlEncodedData4);
//   }, [urlEncodedData4]);

//   const [bodyType, setBodyType] = useState(initialData?.bodyType);
//   const [raw, setRaw] = useState(initialData?.rawType);
//   const [jsonData, setJsonData] = useState(initialData?.jsonData);

//   // Inside the Postman component
//   useEffect(() => {
//     // Check if the specific row's data exists in localStorage
//     const storedData = JSON.parse(localStorage.getItem("collectionData"));
//     if (storedData) {
//       // Find the collection and file based on rowData's parentRowId and childRowId
//       storedData.forEach((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           collection.files.forEach((file) => {
//             if (file.id === rowData.childRowId) {
//               // Update the Postman fields with the current row's data
//               // console.log("file.items[0]:---->>>", file.items[0])
//               setAuthoriziedType(file.items[0]?.authoriziedType || "noAuth");
//               setAuthData1(file.items[0]?.authData || {});
//               setLocalData(file.items[0]);
//               setLocalData1(file);
//               setTrigredMethod(file.items[0]);
//               setUrlData(file.items[0]?.url);
//               setBodyType(file.items[0]?.bodyType);
//               setRaw(file.items[0]?.rawType);
//               setJsonData(file.items[0]?.jsonData);
//             }
//           });
//         }
//       });
//     }
//   }, [rowData, apiMethod, textString]); // Runs when rowData changes, ensuring fresh values for each row

//   let questionMark = "?";

//   const updateApiMethodInLocalStorage = (rowData, newApiMethod) => {
//     // Get the current collection data from localStorage
//     const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//     // Find the collection that matches the parentRowId
//     const updatedCollectionData = collectionData.map((collection) => {
//       if (collection.id === rowData.parentRowId) {
//         // Find the file inside the collection that matches childRowId
//         const updatedItems = collection.files.map((file) => {
//           if (file.id === rowData.childRowId) {
//             // Update apiMethod in the correct file
//             return {
//               ...file,
//               items: file.items.map((item, index) =>
//                 index === 0 ? { ...item, apiMethod: newApiMethod } : item
//               ),
//             };
//           }
//           return file;
//         });

//         // Return updated collection with modified files
//         return { ...collection, files: updatedItems };
//       }
//       return collection;
//     });

//     // Save the updated collection back to localStorage
//     localStorage.setItem(
//       "collectionData",
//       JSON.stringify(updatedCollectionData)
//     );
//   };

//   const handleChange = (event) => {
//     const newApiMethod = event.target.value;
//     setApiMethod(newApiMethod);
//     // Call the function to update localStorage with the new apiMethod value
//     updateApiMethodInLocalStorage(rowData, newApiMethod);
//   };

//   // Update selected rows in the state
//   const handleSelectedRowsChange = (selected) => {
//     setSelectedRows(selected);
//   };

//   // Update query string whenever selected rows change
//   useEffect(() => {
//     setQueryString(
//       selectedRows
//         .map(
//           (row) =>
//             `${encodeURIComponent(row.key)}=${encodeURIComponent(row.value)}`
//         )
//         .join("&")
//     );
//   }, [selectedRows]);

//   useEffect(() => {
//     const createJsonData = (selectedRows) => {
//       let jsonData = {};

//       selectedRows.forEach((row) => {
//         if (row.checked) {
//           if (row.keyField === "TEXT") {
//             jsonData[row.key] = row.value; // Set the value if keyField is TEXT
//           } else if (row.keyField === "FILES") {
//             jsonData[row.key] = row.file; // Set the file if keyField is FILES
//           }
//         }
//       });

//       return jsonData;
//     };

//     if (selectedRows2.length !== 0) {
//       setFormData(createJsonData(selectedRows2));
//     } else {
//       setFormData(0);
//     }
//     // setFormData(createJsonData(selectedRows2));
//   }, [selectedRows2]);

//   // useEffect(()=>{}, [rowData])

//   useEffect(() => {
//     const createJsonData = (selectedRows) => {
//       let jsonData = {};

//       selectedRows.forEach((row) => {
//         if (row.checked) {
//           jsonData[row.key] = row.value; // Set the value if keyField is TEXT
//         }
//       });

//       return jsonData;
//     };

//     if (urlEncodedData.length !== 0) {
//       setUrlEncodedData2(createJsonData(urlEncodedData));
//     } else {
//       setUrlEncodedData2(0);
//     }
//     // setUrlEncodedData2(createJsonData(urlEncodedData));
//   }, [urlEncodedData]);

//   // This is to view the json data in console
//   useEffect(() => {
//     // console.log("Formatted jsonData:", JSON.stringify(formData, null, 2)); // Prettify the json
//     setFormData2(JSON.stringify(formData, null, 2));
//   }, [formData]);

//   useEffect(() => {
//     // console.log("Formatted jsonData:", JSON.stringify(formData, null, 2)); // Prettify the json
//     setUrlEncodedData3(JSON.stringify(urlEncodedData2, null, 2));
//   }, [urlEncodedData2]);

//   const handleParams = () => {
//     setAuthorizationMenu(false);
//     setHeadersMenu(false);
//     setBodyMenu(false);
//     setScriptsMenu(false);
//     setSettingsMenu(false);
//     setParamsMenu(true);
//   };

//   const handleAuthorization = () => {
//     setParamsMenu(false);
//     setHeadersMenu(false);
//     setBodyMenu(false);
//     setScriptsMenu(false);
//     setSettingsMenu(false);
//     setAuthorizationMenu(true);
//   };

//   const handleHeaders = () => {
//     setParamsMenu(false);
//     setAuthorizationMenu(false);
//     setBodyMenu(false);
//     setScriptsMenu(false);
//     setSettingsMenu(false);
//     setHeadersMenu(true);
//   };

//   const handleBody = () => {
//     setParamsMenu(false);
//     setAuthorizationMenu(false);
//     setHeadersMenu(false);
//     setScriptsMenu(false);
//     setSettingsMenu(false);
//     setBodyMenu(true);
//   };

//   const handleScripts = () => {
//     setParamsMenu(false);
//     setAuthorizationMenu(false);
//     setHeadersMenu(false);
//     setBodyMenu(false);
//     setSettingsMenu(false);
//     setScriptsMenu(true);
//   };

//   const handleSettings = () => {
//     setParamsMenu(false);
//     setAuthorizationMenu(false);
//     setHeadersMenu(false);
//     setBodyMenu(false);
//     setScriptsMenu(false);
//     setSettingsMenu(true);
//   };

//   const updateUrlInLocalStorage = (rowData, newUrl) => {
//     // Get the current collection data from localStorage
//     const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//     // Find the collection that matches the parentRowId
//     const updatedCollectionData = collectionData.map((collection) => {
//       if (collection.id === rowData.parentRowId) {
//         // Find the file inside the collection that matches childRowId
//         const updatedItems = collection.files.map((file) => {
//           if (file.id === rowData.childRowId) {
//             // Update apiMethod in the correct file
//             return {
//               ...file,
//               items: file.items.map((item, index) =>
//                 index === 0 ? { ...item, url: newUrl } : item
//               ),
//             };
//           }
//           return file;
//         });

//         // Return updated collection with modified files
//         return { ...collection, files: updatedItems };
//       }
//       return collection;
//     });

//     // Save the updated collection back to localStorage
//     localStorage.setItem(
//       "collectionData",
//       JSON.stringify(updatedCollectionData)
//     );
//   };

//   const handleQueryStringChange = (e) => {
//     const newUrl = e.target.value;
//     setTextString(newUrl);
//     updateUrlInLocalStorage(rowData, newUrl);
//   };

//   useEffect(() => {
//     if (bodyType === "form-data") {
//       // console.log("form-data:--------->>>", formData2);
//       setRequestBodyData(formData2 !== "0" ? formData2 : {});
//     } else if (bodyType === "x-www-form-urlencoded") {
//       setRequestBodyData(urlEncodedData3 !== "0" ? urlEncodedData3 : {});
//     } else if (bodyType === "binary") {
//       setRequestBodyData({});
//     } else if (bodyType === "GraphQL") {
//       setRequestBodyData({});
//     } else if (bodyType === "raw") {
//       setRequestBodyData(Object.keys(jsonData).length !== 0 ? jsonData : {});
//     } else if (bodyType === "binary") {
//       setRequestBodyData(bodyBinaryFileName);
//     } else {
//       setRequestBodyData({});
//     }
//   }, [
//     bodyType,
//     setRequestBodyData,
//     formData2,
//     urlEncodedData3,
//     jsonData,
//     bodyBinaryFileName,
//   ]);

//   const generateUniqueId = () =>
//     Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method
//   //useEffect for set header row data Header  component
//   useEffect(() => {
//     const updateHeaderHiddenRows = () => {
//       const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//       collectionData.map((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           // Find the file inside the collection that matches childRowId
//           const updatedItems = collection.files.map((file) => {
//             if (file.id === rowData.childRowId) {
//               // Extract headerHiddenRows data
//               const headerHiddenRowsData =
//                 file.items[0]?.headerHiddenRows || [];

//               // If bodyType is "form-data", add the Content-Type row
//               if (bodyType === "form-data") {
//                 const contentTypeRow = {
//                   id: generateUniqueId(),
//                   key: "Content-Type",
//                   value: "multipart/form-data",
//                   description: "",
//                   checked: true,
//                 };

//                 // Insert the row before the last one (before the last row)
//                 const updatedHeaderRows = [
//                   ...headerHiddenRowsData.slice(
//                     0,
//                     headerHiddenRowsData.length - 1
//                   ),
//                   contentTypeRow,
//                   ...headerHiddenRowsData.slice(
//                     headerHiddenRowsData.length - 1
//                   ),
//                 ];

//                 // Store the updated rows in state
//                 setHeaderHiddenRows(updatedHeaderRows);
//               } else if (bodyType !== "form-data") {
//                 // If bodyType is not "form-data", remove the Content-Type row if it exists
//                 const updatedHeaderRows = headerHiddenRowsData.filter(
//                   (row) => row.key !== "Content-Type"
//                 );

//                 // Store the updated rows in state
//                 setHeaderHiddenRows(updatedHeaderRows);
//               }

//               // Return the file without any changes
//               return file;
//             }
//             return file;
//           });

//           // Return updated collection (no further changes to items)
//           return { ...collection, files: updatedItems };
//         }
//         return collection;
//       });
//     };

//     updateHeaderHiddenRows();
//   }, [bodyType, rowData]); // Depend on bodyType and rowData

//   //useEffect for set header json data for request
//   useEffect(() => {
//     const transformToJson = (data) => {
//       const transformedData = {};

//       // Loop through the array and populate the object
//       data.forEach((item) => {
//         if (item.key && item.value) {
//           // If the key is "VertexSuite-Token", set a unique token
//           if (item.key === "VertexSuite-Token") {
//             transformedData[item.key] = generateUniqueId(); // Generate unique token
//           } else {
//             transformedData[item.key] = item.value; // Otherwise, set the value as it is
//           }
//         }
//       });

//       return transformedData;
//     };

//     const result = transformToJson(headerHiddenRows);

//     let finalHeaders;
//     if (bodyType === "binary") {
//       finalHeaders = { "Content-Type": "image/webp" };
//     } else if (bodyType === "form-data") {
//       finalHeaders = { "Content-Type": "multipart/form-data" };
//       // finalHeaders = { "Content-Type": "application/json" };
//       // finalHeaders = {};
//     } else {
//       finalHeaders = { "Content-Type": "application/json" };
//     }

//     // Merge the static headers with the result data headers
//     let headers = { ...result, ...finalHeaders };

//     const updateRequestHeaderLocalStorage = (rowData, headers) => {
//       // Get the current collection data from localStorage
//       const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//       // Find the collection that matches the parentRowId
//       const updatedCollectionData = collectionData.map((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           // Find the file inside the collection that matches childRowId
//           const updatedItems = collection.files.map((file) => {
//             if (file.id === rowData.childRowId) {
//               // Update apiMethod in the correct file
//               return {
//                 ...file,
//                 items: file.items.map((item, index) =>
//                   index === 0
//                     ? {
//                         ...item,
//                         headers: [headers],
//                         bodyType: bodyType,
//                         rawType: raw,
//                       }
//                     : item
//                 ),
//               };
//             }
//             return file;
//           });

//           // Return updated collection with modified files
//           return { ...collection, files: updatedItems };
//         }
//         return collection;
//       });

//       // Save the updated collection back to localStorage
//       localStorage.setItem(
//         "collectionData",
//         JSON.stringify(updatedCollectionData)
//       );
//     };

//     updateRequestHeaderLocalStorage(rowData, headers);

//     setHeadersJsonData1(headers);
//   }, [bodyType, headerHiddenRows, rowData, raw]);

//   // console.log("headersJsonData1111:---------------->>>>>", headersJsonData1);

//   const handleSend = async () => {
//     const startTime = new Date().getTime(); // Capture start time for the API call

//     // Function to generate a unique ID for each row (UUID)
//     const generateUniqueId = () =>
//       Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

//     // Combine the textString and queryString into finalQueryString
//     const finalQueryString =
//       textString + (queryString ? `?${queryString}` : "");

//     // Log the API Method and final URL for debugging
//     console.log("API Method:", apiMethod);
//     console.log("Final Query String:", finalQueryString);

//     // Construct the full URL using your base URL
//     // const baseUrl = "http://localhost:5000/api/template"; // Your base API URL
//     const url = `${finalQueryString}`;

//     console.log("url:-------------->>>>", url);

//     let requestBody2 =
//       Object.keys(jsonData).length !== 0
//         ? jsonData
//         : formData2 !== "0"
//         ? formData2
//         : urlEncodedData3 !== "0"
//         ? urlEncodedData3
//         : {};

//     // Function to convert the array into the desired JSON format
//     const transformToJson = (data) => {
//       const transformedData = {};

//       // Loop through the array and populate the object
//       data.forEach((item) => {
//         if (item.key && item.value) {
//           // If the key is "VertexSuite-Token", set a unique token
//           if (item.key === "VertexSuite-Token") {
//             transformedData[item.key] = generateUniqueId(); // Generate unique token
//           } else {
//             transformedData[item.key] = item.value; // Otherwise, set the value as it is
//           }
//         }
//       });

//       return transformedData;
//     };

//     const result = transformToJson(headerJsonData);

//     // let finalHeaders = { "Content-Type": "application/json" };

//     let finalHeaders;
//     if (bodyType === "binary") {
//       finalHeaders = { "Content-Type": "image/webp" };
//     } else if (bodyType === "form-data") {
//       finalHeaders = { "Content-Type": "multipart/form-data" };
//       // finalHeaders = { "Content-Type": "application/json" };
//       // finalHeaders = {};
//     } else {
//       finalHeaders = { "Content-Type": "application/json" };
//     }

//     // Merge the static headers with the result data headers
//     let headers = { ...result, ...finalHeaders };

//     switch (authoriziedType) {
//       case "basicAuth":
//         if (!authData1?.userName || !authData1?.userPassword) {
//           console.error("Username or Password is missing");
//           return;
//         }
//         // Basic Auth encoding
//         headers["Authorization"] =
//           "Basic " + btoa(authData1?.userName + ":" + authData1?.userPassword);
//         break;
//       case "bearerToken":
//         if (!authData1?.tokenData) {
//           console.error("Token is missing");
//           return;
//         }
//         headers["Authorization"] = "Bearer " + authData1?.tokenData;
//         break;
//       case "apiKey":
//         if (!authData1.apiKey) {
//           console.error("API Key is missing");
//           return;
//         }
//         headers["x-api-key"] = authData1.apiKey;
//         break;
//       // Add cases for other auth types
//       default:
//         break;
//     }

//     // console.log("requestBodyData:----------->>>", requestBodyData);

//     try {
//       let response;
//       if (apiMethod === "GET") {
//         response = await fetch(url, {
//           method: "GET",
//           headers: headers,
//         });
//       } else if (apiMethod === "POST") {
//         if (bodyType === "form-data") {
//           const formData = new FormData();

//           // Appending multiple files
//           Array.from(imgFiles).forEach((file) => {
//             formData.append("imgFiles", file); // 'imgFiles' key for each file
//           });

//           // Appending JSON data
//           // formData.append("rawData", JSON.stringify(rawData)); // rawData as JSON string
//           Object.keys(rawData).forEach((key) => {
//             formData.append(key, rawData[key]); // Appending rawData key-value pairs
//           });

//           response = await axios.post(url, formData, {
//             headers: headers,
//           });
//         } else {
//           response = await fetch(url, {
//             method: "POST",
//             headers: headers,
//             body: requestBodyData,
//           });
//         }
//       } else if (apiMethod === "PUT") {
//         response = await fetch(url, {
//           method: "PUT",
//           headers: headers,
//           body: requestBodyData,
//         });
//       } else if (apiMethod === "DELETE") {
//         response = await fetch(url, {
//           method: "DELETE",
//           headers: headers,
//           body: requestBodyData,
//         });
//       } else {
//         console.error("Unsupported method:", apiMethod);
//         return;
//       }
//       // console.log("response44", response);
//       // Check if the response is successful
//       const endTime = new Date().getTime(); // Capture end time
//       setResponseTime(endTime - startTime); // Calculate time taken for the API call
//       setStatusCode(response.status); // Set the status code

//       const contentLength = response.headers.get("content-length"); // Get content length from headers

//       // Calculate response size in KB, MB, etc.
//       let size = contentLength ? parseInt(contentLength) : 0;
//       if (size > 1024 * 1024) {
//         setResponseSize((size / (1024 * 1024)).toFixed(2) + " MB");
//       } else if (size > 1024) {
//         setResponseSize((size / 1024).toFixed(2) + " KB");
//       } else {
//         setResponseSize(size + " Bytes");
//       }

//       if (response.ok || response.status === 200) {
//         let data;
//         if (bodyType === "form-data") {
//           data = response.data;
//         } else {
//           data = await response.json();
//         }

//         console.log("Response Data:", data);
//         setResponseData(data);
//       } else {
//         console.error("Error fetching data:", response);
//         // setResponseData(response);
//         setErrorAPI(response);
//         setStatusCode(response.status);
//         setErrorMessage(`Error: ${response.statusText}`);
//       }
//       const currentTime = new Date().toLocaleString();
//       setLastCallTime(currentTime); // Store the last call time
//     } catch (error) {
//       console.error("Request failed:", error);
//       // setResponseData(error);
//       setErrorAPI(error);
//       setErrorMessage("Request failed: " + error.message);
//     }
//   };

//   useEffect(() => {
//     // console.log("errorApi_status:---------->>", errorApi);
//     // console.log("rowData:---------->>", rowData);

//     const updateApiErrorLogInLocalStorage = (rowData, errorApi) => {
//       // Ensure errorApi is not null or undefined
//       if (!errorApi) {
//         // console.error("errorApi is null or undefined");
//         return;
//       }

//       // Get the current collection data from localStorage
//       const collectionData = JSON.parse(localStorage.getItem("collectionData"));

//       // If collectionData is null or empty, return early
//       if (!collectionData) {
//         console.error("No collection data found in localStorage");
//         return;
//       }

//       // Get current date and time
//       const currentDate = new Date();
//       const date = currentDate.toLocaleDateString(); // Format date (e.g., "3/4/2024")
//       const time = currentDate.toLocaleTimeString(); // Format time (e.g., "12:34:56 PM")

//       // Find the collection that matches the parentRowId
//       const updatedCollectionData = collectionData.map((collection) => {
//         if (collection.id === rowData.parentRowId) {
//           // Find the file inside the collection that matches childRowId
//           const updatedItems = collection.files.map((file) => {
//             if (file.id === rowData.childRowId) {
//               // Create a new errorLog object with status, errorMsg, date, and time
//               const newErrorLog = {
//                 status: errorApi.status || "", // Default to empty string if undefined
//                 errorMsg: errorApi.statusText || "", // Default to empty string if undefined
//                 date: date, // Store current date
//                 time: time, // Store current time
//               };

//               // Update errorLogs with the new error log
//               const updatedErrorLogs = file.errorLogs
//                 ? [...file.errorLogs, newErrorLog] // Add new error log to existing ones
//                 : [newErrorLog]; // If no errorLogs, create a new array

//               // Keep only the latest 10 logs (if more than 10, remove the oldest)
//               if (updatedErrorLogs.length > 10) {
//                 updatedErrorLogs.shift(); // Remove the first (oldest) entry
//               }

//               return {
//                 ...file,
//                 errorLogs: updatedErrorLogs, // Updated errorLogs array
//               };
//             }
//             return file;
//           });

//           // Return updated collection with modified files
//           return { ...collection, files: updatedItems };
//         }
//         return collection;
//       });

//       // Save the updated collection back to localStorage
//       const errorLog = localStorage.setItem(
//         "collectionData",
//         JSON.stringify(updatedCollectionData)
//       );
//       // console.log("errorLog121:---------->>>", updatedCollectionData)
//       setErrorLogDataValue(updatedCollectionData);
//     };

//     // Call the update function with rowData and errorApi
//     updateApiErrorLogInLocalStorage(rowData, errorApi);
//   }, [errorApi]);

//   // console.error("ErrorData:------------>>>>>", errorMessage)
//   return (
//     <Stack
//       sx={{
//         border: "1px solid blue",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* File name and method name */}
//       <Stack sx={{ border: "1px solid red", height: "4%" }}>
//         <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//           <Stack sx={{ display: "flex", fontSize: "12px" }}>
//             {" "}
//             {rowData?.fileMethod}
//           </Stack>
//           <Stack sx={{ display: "flex", fontSize: "12px" }}>
//             {rowData?.fileName}
//           </Stack>
//         </Stack>
//       </Stack>
//       {/*Breadcrumns Folder name & File name and Save button */}
//       <Stack sx={{ border: "1px solid blue", height: "4%" }}>
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Breadcrumbs aria-label="breadcrumb">
//             <Typography
//               color="inherit"
//               sx={{ display: "flex", fontSize: "12px", alignItems: "center" }}
//             >
//               {rowData?.parentRowName}
//             </Typography>
//             <Typography
//               component="div" // Change the component to div
//               sx={{
//                 color: "text.primary",
//                 display: "flex",
//                 fontSize: "12px",
//                 alignItems: "center",
//               }}
//               onClick={handleTypographyClick}
//             >
//               {isEditing ? (
//                 <TextField
//                   value={newFileName}
//                   onChange={handleTextFieldChange}
//                   onBlur={handleSave} // Save when the TextField loses focus
//                   onKeyPress={handleKeyPress} // Save on "Enter" key press
//                   autoFocus
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     fontSize: "12px",
//                     width: "150px",
//                     height: "20px",
//                   }}
//                 />
//               ) : (
//                 <>
//                   {/* {rowData?.fileName} */}
//                   {localData3?.name || rowData?.fileName}
//                   {/* {"----"} */}
//                   {/* {rowData?.childRowId} */}
//                 </>
//               )}
//             </Typography>
//           </Breadcrumbs>

//           <Stack
//             sx={{ display: "flex", flexDirection: "row", marginRight: "8px" }}
//           >
//             <Stack sx={{ fontSize: "12px" }}>Save</Stack>
//           </Stack>
//         </Stack>
//       </Stack>
//       {/*Api Calling */}
//       <Stack
//         sx={{
//           border: "2px solid green",
//           height: "62%",
//           display: "flex",
//           flexDirection: "column",
//           overflowY: "auto",
//         }}
//       >
//         {/* Api header */}
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             height: "6%",
//           }}
//         >
//           <Stack sx={{ width: "10%" }}>
//             <FormControl fullWidth>
//               <Select
//                 value={localData.apiMethod || apiMethod}
//                 onChange={handleChange}
//                 size="small"
//               >
//                 <MenuItem value="GET">GET</MenuItem>
//                 <MenuItem value="POST">POST</MenuItem>
//                 <MenuItem value="PUT">PUT</MenuItem>
//                 <MenuItem value="DELETE">DELETE</MenuItem>
//                 <MenuItem value="PATCH">PATCH</MenuItem>
//                 <MenuItem value="HEAD">HEAD</MenuItem>
//                 <MenuItem value="OPTION">OPTION</MenuItem>
//               </Select>
//             </FormControl>
//           </Stack>
//           <Stack sx={{ width: "80%" }}>
//             <TextField
//               size="small"
//               // value={
//               //   queryString && queryString.length > 0
//               //     ? `${textString}?${queryString}`
//               //     : textString
//               // }
//               value={
//                 queryString && queryString.length > 0
//                   ? `${urlData}?${queryString}`
//                   : urlData || ""
//               }
//               onChange={handleQueryStringChange}
//               fullWidth
//             />
//           </Stack>
//           <Stack sx={{ width: "10%" }}>
//             <Button variant="contained" onClick={handleSend}>
//               Send
//             </Button>
//           </Stack>
//         </Stack>

//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             height: "94%",
//           }}
//         >
//           <Stack
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               marginTop: "12px",
//               height: "4%",
//               gap: 2,
//             }}
//           >
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: paramsMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleParams}
//             >
//               Params
//             </Stack>
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: authorizationMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleAuthorization}
//             >
//               Authorization
//             </Stack>
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: headersMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleHeaders}
//             >
//               Headers
//             </Stack>
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: bodyMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleBody}
//             >
//               Body
//             </Stack>
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: scriptsMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleScripts}
//             >
//               Script
//             </Stack>
//             <Stack
//               sx={{
//                 fontSize: "12px",
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 borderBottom: settingsMenu ? "2px solid #1c90fc" : "none",
//               }}
//               onClick={handleSettings}
//             >
//               Setting
//             </Stack>
//           </Stack>
//           {/* Header values */}
//           <Stack sx={{ height: "96%" }}>
//             <Stack sx={{ height: "100%" }}>
//               {paramsMenu && (
//                 <Params
//                   selectedRows={selectedRows}
//                   handleSelectedRowsChange={handleSelectedRowsChange}
//                 />
//               )}

//               {authorizationMenu && (
//                 <Authorization
//                   authoriziedType={authoriziedType}
//                   setAuthoriziedType={setAuthoriziedType}
//                   authData1={authData1}
//                   setAuthData1={setAuthData1}
//                   rowData={rowData}
//                 />
//               )}
//               {settingsMenu && <Settings />}
//               {scriptsMenu && <Scripts />}
//               {bodyMenu && (
//                 <Body
//                   bodyType={bodyType}
//                   setBodyType={setBodyType}
//                   jsonData={jsonData}
//                   setJsonData={setJsonData}
//                   selectedRows2={selectedRows2}
//                   setSelectedRows2={setSelectedRows2}
//                   urlEncodedData={urlEncodedData}
//                   setUrlEncodedData={setUrlEncodedData}
//                   raw={raw}
//                   setRaw={setRaw}
//                   bodyBinaryFileName={bodyBinaryFileName}
//                   setBodyBinaryFileName={setBodyBinaryFileName}
//                   imgFiles={imgFiles}
//                   rawData={rawData}
//                   setImgFiles={setImgFiles}
//                   setRawData={setRawData}
//                   rowData={rowData}
//                   initialData={initialData}
//                   localData={localData}
//                   selectedRows3={selectedRows3}
//                   setSelectedRows3={setSelectedRows3}
//                   urlEncodedData4={urlEncodedData4}
//                   setUrlEncodedData4={setUrlEncodedData4}
//                 />
//               )}
//               {headersMenu && (
//                 <Headers
//                   headerJsonData={headerJsonData}
//                   setHeaderJsonData={setHeaderJsonData}
//                   bodyType={bodyType}
//                   raw={raw}
//                   rowData={rowData}
//                   headerHiddenRows={headerHiddenRows}
//                 />
//               )}
//             </Stack>
//           </Stack>
//         </Stack>
//       </Stack>
//       {/*Api Response */}
//       <Stack sx={{ border: "1px solid red", height: "30%" }}>
//         <Stack sx={{ overflowY: "auto" }}>
//           {" "}
//           <JSONWithLineNumbers
//             json={responseData}
//             responseTime={responseTime}
//             statusCode={statusCode}
//             responseSize={responseSize}
//             lastCallTime={lastCallTime}
//             errorMessage={errorMessage}
//             errorApi={errorApi} // Pass errorApi
//             rowData={rowData}
//             errorLogDataValue={errorLogDataValue}
//           />
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default Postman;
import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useRef, useState } from "react";
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
  import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
  import { RiDeleteBin5Line } from "react-icons/ri";
  import debounce from "lodash.debounce";
  import { IoSaveOutline } from "react-icons/io5";
  import httpImg from "./img/httpImg.png";
  import TopHeader from "./TopHeader";
  
  const generateUniqueId = () =>
    Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method
  
  const Postman = ({
    rowData,
    initialData,
    setInitialData,
    trigredMethod,
    setTrigredMethod,
    trigredFileName,
    trigredFileName1,
    setTrigredFileName,
    setTrigredFileName1,
    selectedFileData,
    setSelectedFileData,
  }) => {
    // console.log("initialData:------------>>>", initialData);
    const [localData, setLocalData] = useState([]);
    const [errorLogDataValue, setErrorLogDataValue] = useState([]);
    const [localData1, setLocalData1] = useState([]);
    const [apiMethod, setApiMethod] = useState(localData?.apiMethod || "GET");
    const [urlData, setUrlData] = useState(
      initialData?.url || localData?.url || ""
    );
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
    const [responseTime, setResponseTime] = useState(null);
    const [lastCallTime, setLastCallTime] = useState(null);
    const [responseFormat, setResponseFormat] = useState("json"); // Default to JSON format
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessage1, setErrorMessage1] = useState(null);
    const [errorApi, setErrorAPI] = useState(null);
    const [statusCode, setStatusCode] = useState(null);
    const [responseSize, setResponseSize] = useState(null);
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
    const [checkAPIMethod, setCheckAPIMethod] = useState([]);
    const [checkFileName, setCheckFileName] = useState([]);
    const inputRef = useRef(null); // Use ref to store the input element
    // url set and param state and function START ----------------------------------------->>>
    // console.log("localData:---------->>>>", localData);
    // console.log("localData?.url:---------->>>>", localData?.url);
    const [queryString1, setQueryString1] = useState(""); // State to hold the query string
    // const [postmanParams, setPostmanParams] = useState(
    //   localData?.headerParamsRows
    // ); // State to hold the Postman Params
  
    // console.log(
    //   "localData?.headerParamsRows=========>>>",
    //   localData?.headerParamsRows
    // );
    const [postmanParamsTest, setPostmanParamsTest] = useState([]);
  
    const [postmanParams, setPostmanParams] = useState(
      localData?.headerParamsRows || [
        [
          {
            id: generateUniqueId(),
            key: "",
            value: "",
            description: "",
            checked: false,
          },
        ],
      ]
    );
  
    // console.log("postmanParams:----------->>>>", postmanParams)
  
    // Base URL
    const baseURL = "?";
  
    const updateParamsTableLocalStorage = (rowData, newParams) => {
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
                        headerParamsRows: [newParams],
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
  
    // Function to handle query string changes
    const handleChange1 = (event) => {
      // const newUrl = event.target.value;
      const value = event.target.value;
      setQueryString1(value);
      updateUrlInLocalStorage(rowData, value);
  
      // Check if '?' is in the string, and handle query key-value addition
      if (value.includes("?")) {
        const parts = value.split("?");
        const queryPart = parts[1];
        const keyValuePairs = queryPart.split("&");
  
        // Create or update the key-value pairs for each parameter
        const newParams = keyValuePairs.map((pair) => {
          const [key, val] = pair.split("="); // Split by "=" to get key and value
          return {
            id: generateUniqueId(),
            key: key || "",
            value: val || "",
            description: "",
            checked: key || val ? true : false, // Set checkbox true if either key or value is filled
          };
        });
  
        // Ensure that only one empty row exists
        if (newParams.length === 0 || newParams.length > 0) {
          newParams.push({
            id: generateUniqueId(),
            key: "",
            value: "",
            description: "",
            checked: false,
          });
        }
  
        // Update state and localStorage with the new query params
        setPostmanParams(newParams);
        updateParamsTableLocalStorage(rowData, newParams);
        localStorage.setItem("postmanParams", JSON.stringify(newParams)); // Save to localStorage
      } else {
        // If the query string doesn't contain "?", reset the parameters but keep the empty row
        const updatedParams = [
          {
            id: generateUniqueId(),
            key: "",
            value: "",
            description: "",
            checked: false,
          },
        ];
  
        setPostmanParams(updatedParams);
        updateParamsTableLocalStorage(rowData, updatedParams);
        localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Save to localStorage
      }
    };
  
    // Function to handle key deletion in the table
    const handleDelete = (index) => {
      // Prevent deletion of the last empty row
      if (postmanParams.length > 1) {
        const updatedParams = [...postmanParams];
        updatedParams.splice(index, 1);
        setPostmanParams(updatedParams);
        updateParamsTableLocalStorage(rowData, updatedParams);
        // localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage
  
        // Rebuild the query string based on the remaining rows
        const queryParts = updatedParams
          .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
          .map((param) => `${param.key}=${param.value}`);
  
        // Update the query string but keep the initial part intact
        const basePart = queryString1.split("?")[0];
        const newUrl = `${basePart}?${queryParts.join("&")}`;
        updateUrlInLocalStorage(rowData, newUrl);
        setQueryString1(`${basePart}?${queryParts.join("&")}`);
      }
    };
  
    // Function to update checkbox status and handle value deletion
    const handleInputChange = (index, field, value) => {
      const updatedParams = [...postmanParams];
      updatedParams[index][field] = value;
  
      // Automatically check the checkbox when either key or value is filled
      if (updatedParams[index].key !== "" || updatedParams[index].value !== "") {
        updatedParams[index].checked = true;
      } else {
        updatedParams[index].checked = false;
      }
  
      // Ensure that if both key and value are deleted, the checkbox is unchecked
      if (updatedParams[index].key === "" && updatedParams[index].value === "") {
        updatedParams[index].checked = false;
        // If both key and value are empty, remove the row from postmanParams
        updatedParams.splice(index, 1);
      }
  
      // Check if last row is being edited and if the last row has both key or value filled
      if (
        index === updatedParams.length - 1 &&
        (updatedParams[index].key !== "" || updatedParams[index].value !== "")
      ) {
        // Add a new row if both fields are filled
        updatedParams.push({
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        });
      }
  
      // Update the table and localStorage with the changes
      setPostmanParams(updatedParams);
      updateParamsTableLocalStorage(rowData, updatedParams);
      // localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage
  
      // Dynamically update the query string based on all rows
      const queryParts = updatedParams
        .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
        .map((param) => `${param.key}=${param.value}`);
  
      // Update the query string but keep the initial part intact
      const basePart = queryString1.split("?")[0];
      const newUrl = `${basePart}?${queryParts.join("&")}`;
      // console.log("basePart:-------->>>", basePart);
      // console.log("queryParts:-------->>>", queryParts);
      updateUrlInLocalStorage(rowData, newUrl);
      setQueryString1(`${basePart}?${queryParts.join("&")}`);
    };
  
    // Initialize state from localStorage on first render, but ensure an empty row exists
    // useEffect(() => {
    //   const storedParams = JSON.parse(localStorage.getItem("postmanParams"));
    //   if (storedParams && storedParams.length > 0) {
    //     setPostmanParams(storedParams);
    //   } else {
    //     setPostmanParams([
    //       {
    //         id: generateUniqueId(),
    //         key: "",
    //         value: "",
    //         description: "",
    //         checked: false,
    //       },
    //     ]);
    //   }
    // }, []);
  
    // Function to handle checkbox change and toggle query string
    const handleCheckboxChange = (index, checked) => {
      const updatedParams = [...postmanParams];
      updatedParams[index].checked = checked;
  
      // Update the table and localStorage with the changes
      setPostmanParams(updatedParams);
      updateParamsTableLocalStorage(rowData, updatedParams);
      // localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage
  
      // Dynamically update the query string based on checked rows
      const queryParts = updatedParams
        .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
        .map((param) => `${param.key}=${param.value}`);
  
      // Update the query string but keep the initial part intact
      const basePart = queryString1.split("?")[0];
      const newUrl = `${basePart}?${queryParts.join("&")}`;
      updateUrlInLocalStorage(rowData, newUrl);
      setQueryString1(`${basePart}?${queryParts.join("&")}`);
    };
  
    // console.log("postmanParams:-------------->>>>", postmanParams);
    //  url set and param state and function END----------------------------------------->>>
  
    const updateResponseDataLocalStorage = (
      rowData,
      responseData,
      responseTimeData,
      lastCallTime,
      statusCode,
      responseSize,
      msg
    ) => {
      // Get the current collection data from localStorage
      const collectionData = JSON.parse(localStorage.getItem("collectionData"));
  
      // Find the collection that matches the parentRowId
      const updatedCollectionData = collectionData.map((collection) => {
        if (collection.id === rowData.parentRowId) {
          // Find the file inside the collection that matches childRowId
          const updatedItems = collection.files.map((file) => {
            if (file.id === rowData.childRowId) {
              // Update the specific file's response data
              return {
                ...file,
                items: file.items.map((item, index) =>
                  index === 0
                    ? {
                        ...item,
                        responseData: responseData,
                        responseTime: responseTimeData,
                        lastCallTime: lastCallTime,
                        statusCode: statusCode,
                        responseSize: responseSize,
                        errorMsg: msg,
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
  
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX This code for folder request name and folder request method in left menu side XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // State to track whether we're in edit mode
    const [isEditing1, setIsEditing1] = useState(false);
    const [newFileName1, setNewFileName1] = useState(rowData?.parentRowName);
    const [localData31, setLocalData31] = useState(rowData?.parentRowName);
  
    // Handle the click on the Typography to enter edit mode
    const handleTypographyClick1 = () => {
      setIsEditing1(true);
    };
  
    // Handle saving the new value
    const handleSave1 = () => {
      // After saving, switch back to the Typography view
      setIsEditing1(false);
    };
  
    const updateFileNameInLocalStorage1 = (rowData, fileName) => {
      // Get the current collection data from localStorage
      const collectionData = JSON.parse(localStorage.getItem("collectionData"));
  
      // Find the collection that matches the parentRowId
      const updatedCollectionData = collectionData.map((collection) => {
        if (collection.id === rowData.parentRowId) {
          // Find the file inside the collection that matches childRowId
  
          collection.name = fileName;
          // Return updated collection with modified files
          return { ...collection };
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
    const handleTextFieldChange1 = (e) => {
      const fileName = e.target.value;
      setNewFileName1(fileName);
      updateFileNameInLocalStorage1(rowData, fileName);
      setTrigredFileName1(fileName);
    };
  
    useEffect(() => {
      // Check if the specific row's data exists in localStorage
      const storedData = JSON.parse(localStorage.getItem("collectionData"));
      if (storedData) {
        // Find the collection and file based on rowData's parentRowId and childRowId
        storedData.forEach((collection) => {
          if (collection.id === rowData.parentRowId) {
            setLocalData31(collection);
            setNewFileName1(collection?.name);
          }
        });
      }
    }, [rowData, trigredFileName1]);
  
    // Handle "Enter" key press to save the value
    const handleKeyPress1 = (e) => {
      if (e.key === "Enter") {
        handleSave1();
      }
    };
    // XXXXXXXXXXXXXXXXXXThis code for request folder name and request folder method in left menu sideXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX This code for request name and request method in left menu side XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
      setCheckFileName(updatedCollectionData); // for topHeader component
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
  
    useEffect(() => {
      // Check if the specific row's data exists in localStorage
      const storedData = JSON.parse(localStorage.getItem("collectionData"));
      if (storedData) {
        // Find the collection and file based on rowData's parentRowId and childRowId
        storedData.forEach((collection) => {
          if (collection.id === rowData.parentRowId) {
            collection.files.forEach((file) => {
              if (file.id === rowData.childRowId) {
                setLocalData3(file);
                setNewFileName(file?.name);
              }
            });
          }
        });
      }
    }, [rowData, trigredFileName]);
  
    // Handle "Enter" key press to save the value
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSave();
      }
    };
    // XXXXXXXXXXXXXXXXXXThis code for request name and request method in left menu sideXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  
    // console.log("localData3:----------->>>", localData3)
  
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
  
    const [bodyType, setBodyType] = useState(initialData?.bodyType);
    const [raw, setRaw] = useState(initialData?.rawType);
    const [jsonData, setJsonData] = useState(initialData?.jsonData);
  
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
                // console.log(
                //   "file.items[0]?.headerParamsRows:------------>>>",
                //   [file.items[0]?.headerParamsRows]
                // );
                setAuthoriziedType(file.items[0]?.authoriziedType || "noAuth");
                setAuthData1(file.items[0]?.authData || {});
                setLocalData(file.items[0]);
                setLocalData1(file);
                setTrigredMethod(file.items[0]);
                setUrlData(file.items[0]?.url);
                setQueryString1(file.items[0]?.url);
                setPostmanParams(file.items[0]?.headerParamsRows[0]);
                setPostmanParamsTest(file.items[0]?.headerParamsRows[0]);
                setBodyType(file.items[0]?.bodyType);
                setRaw(file.items[0]?.rawType);
                setJsonData(file.items[0]?.jsonData);
                setResponseData(file.items[0]?.responseData);
                setResponseTime(file.items[0]?.responseTime);
                setLastCallTime(file.items[0]?.lastCallTime);
                setStatusCode(file.items[0]?.statusCode);
                setResponseSize(file.items[0]?.responseSize);
                setErrorMessage1(file.items[0]?.errorMsg);
              }
            });
          }
        });
      }
    }, [rowData, apiMethod, textString, queryString1]); // Runs when rowData changes, ensuring fresh values for each row
  
    let questionMark = "?";
    // console.log("urlData121:------------>>>", urlData);
    // console.log("---------------Start-----------------------------");
    // console.log("responseData:------------>>>", responseData);
    // console.log("responseTime:------------>>>", responseTime);
    // console.log("lastCallTime:------------>>>", lastCallTime);
    // console.log("statusCode:------------>>>", statusCode);
    // console.log("responseSize:------------>>>", responseSize);
    // console.log("---------------End-----------------------------");
    // console.log("postmanParams:-------------->>>>", postmanParams);
    // console.log("postmanParamsTest:-------------->>>>", postmanParamsTest);
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
  
      setCheckAPIMethod(updatedCollectionData); // for topHeader component
      // Save the updated collection back to localStorage
      localStorage.setItem(
        "collectionData",
        JSON.stringify(updatedCollectionData)
      );
    };
  
    console.log("checkAPIMethod:------------>>>>", checkAPIMethod);
    console.log("checkFileName:------------>>>>", checkFileName);
  
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
      let startTime = new Date().getTime(); // Capture start time for the API call
  
      // Function to generate a unique ID for each row (UUID)
      const generateUniqueId = () =>
        Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method
  
      // Combine the textString and queryString into finalQueryString
      const finalQueryString =
        textString + (queryString ? `?${queryString}` : "");
  
      // Log the API Method and final URL for debugging
      console.log("API Method:", apiMethod);
      // console.log("Final Query String:", finalQueryString);
  
      // Construct the full URL using your base URL
      // const baseUrl = "http://localhost:5000/api/template"; // Your base API URL
      const url = `${queryString1}` || `${urlData}`;
  
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
        let endTime = new Date().getTime(); // Capture end time
        let responseTimeData = endTime - startTime;
        setResponseTime(endTime - startTime); // Calculate time taken for the API call
        setStatusCode(response.status); // Set the status code
  
        const contentLength = response.headers.get("content-length"); // Get content length from headers
  
        // Calculate response size in KB, MB, etc.
        let size = contentLength ? parseInt(contentLength) : 0;
        let responseSize;
  
        if (size > 1024 * 1024) {
          responseSize = (size / (1024 * 1024)).toFixed(2) + " MB";
        } else if (size > 1024) {
          responseSize = (size / 1024).toFixed(2) + " KB";
        } else {
          responseSize = size + " Bytes";
        }
  
        if (size > 1024 * 1024) {
          setResponseSize((size / (1024 * 1024)).toFixed(2) + " MB");
        } else if (size > 1024) {
          setResponseSize((size / 1024).toFixed(2) + " KB");
        } else {
          setResponseSize(size + " Bytes");
        }
  
        if (response.ok || response.status === 200) {
          let data;
          if (bodyType === "form-data") {
            data = response.data;
          } else {
            data = await response.json();
          }
          console.log("response332:------------>>>", response);
          console.log("Response Data:", data);
          setResponseData(data);
          let msg = null;
          // Update the response data in localStorage
          updateResponseDataLocalStorage(
            rowData,
            data,
            responseTimeData,
            new Date().toLocaleString(),
            response.status,
            responseSize,
            msg
          );
        } else {
          console.error("Error fetching data:", response);
          // setResponseData(response);
          setErrorAPI(response);
          setStatusCode(response.status);
          setErrorMessage(`Error: ${response.statusText}`);
          console.log("first:0000-------->>>", response.statusText);
          let msg = response.statusText;
          // Save the error response in localStorage
          updateResponseDataLocalStorage(
            rowData,
            { errorMessage: `Error: ${response.statusText}` },
            responseTimeData,
            new Date().toLocaleString(),
            response.status,
            "N/A",
            msg
          );
        }
        const currentTime = new Date().toLocaleString();
        setLastCallTime(currentTime); // Store the last call time
      } catch (error) {
        let endTime2 = new Date().getTime(); // Capture end time
        let responseTimeData2 = endTime2 - startTime;
        console.error("Request failed:", error);
        // setResponseData(error);
        setErrorAPI(error);
        setErrorMessage("Request failed: " + error.message);
        let msg = error.message;
        // Save the error response in localStorage
        updateResponseDataLocalStorage(
          rowData,
          { errorMessage: "Request failed: " + error.message },
          responseTimeData2,
          new Date().toLocaleString(),
          "500",
          "N/A",
          msg
        );
      }
    };
  
    useEffect(() => {
      // console.log("errorApi_status:---------->>", errorApi);
      // console.log("rowData:---------->>", rowData);
  
      const updateApiErrorLogInLocalStorage = (rowData, errorApi) => {
        // Ensure errorApi is not null or undefined
        if (!errorApi) {
          // console.error("errorApi is null or undefined");
          return;
        }
  
        // Get the current collection data from localStorage
        const collectionData = JSON.parse(localStorage.getItem("collectionData"));
  
        // If collectionData is null or empty, return early
        if (!collectionData) {
          console.error("No collection data found in localStorage");
          return;
        }
  
        // Get current date and time
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString(); // Format date (e.g., "3/4/2024")
        const time = currentDate.toLocaleTimeString(); // Format time (e.g., "12:34:56 PM")
  
        // Find the collection that matches the parentRowId
        const updatedCollectionData = collectionData.map((collection) => {
          if (collection.id === rowData.parentRowId) {
            // Find the file inside the collection that matches childRowId
            const updatedItems = collection.files.map((file) => {
              if (file.id === rowData.childRowId) {
                // Create a new errorLog object with status, errorMsg, date, and time
                const newErrorLog = {
                  status: errorApi.status || "", // Default to empty string if undefined
                  errorMsg: errorApi.statusText || "", // Default to empty string if undefined
                  date: date, // Store current date
                  time: time, // Store current time
                };
  
                // Update errorLogs with the new error log
                const updatedErrorLogs = file.errorLogs
                  ? [...file.errorLogs, newErrorLog] // Add new error log to existing ones
                  : [newErrorLog]; // If no errorLogs, create a new array
  
                // Keep only the latest 10 logs (if more than 10, remove the oldest)
                if (updatedErrorLogs.length > 10) {
                  updatedErrorLogs.shift(); // Remove the first (oldest) entry
                }
  
                return {
                  ...file,
                  errorLogs: updatedErrorLogs, // Updated errorLogs array
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
        const errorLog = localStorage.setItem(
          "collectionData",
          JSON.stringify(updatedCollectionData)
        );
        // console.log("errorLog121:---------->>>", updatedCollectionData)
        setErrorLogDataValue(updatedCollectionData);
      };
  
      // Call the update function with rowData and errorApi
      updateApiErrorLogInLocalStorage(rowData, errorApi);
    }, [errorApi]);
  
    const handleSaveData = async () => {
      // Retrieve collectionData from localStorage
      const storedData = localStorage.getItem("collectionData");
  
      if (storedData) {
        // Parse the JSON data
        const collectionData = JSON.parse(storedData);
  
        // Logging the collection data to check if it's correct
        console.log("Collection Data: ", collectionData);
  
        // Now, you can send this data to the database, for example using fetch or axios
        try {
          const response = await fetch(
            "http://localhost:5000/api/postman-collection-data",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(collectionData),
            }
          );
  
          if (response.ok) {
            alert("Data saved successfully!");
          } else {
            alert("Failed to save data");
          }
        } catch (error) {
          console.error("Error saving data:", error);
          alert("Error saving data");
        }
      } else {
        alert("No data found in localStorage");
      }
    };
  
    // Example of saving data to localStorage (this would typically be done earlier in your app)
    const saveToLocalStorage = (data) => {
      localStorage.setItem("collectionData", JSON.stringify(data));
    };
  
    // Listen to keydown event on document for Ctrl + S
    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.ctrlKey && event.key === "s") {
          event.preventDefault(); // Prevent the default browser save behavior (optional)
          handleSaveData(); // Call your save function
        }
      };
  
      // Attach the event listener
      document.addEventListener("keydown", handleKeyPress);
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [handleSaveData]);
  
    // console.error("ErrorData:------------>>>>>", errorMessage)
    const getSelectValueColor = (value) => {
      switch (value) {
        case "GET":
          return "green";
        case "POST":
          return "orange";
        case "PUT":
          return "blue";
        case "DELETE":
          return "red";
        case "PATCH":
          return "violet";
        case "HEAD":
          return "green";
        case "OPTION":
          return "#f54088";
        default:
          return "black"; // Default color if no match
      }
    };
  
    return (
      <Stack
        sx={{
          // border: "1px solid blue",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* File name and method name */}
        <Stack
          sx={{
            // border: "1px solid red",
            height: "4%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              marginLeft: "4px",
            }}
          >
            <Stack sx={{ display: "flex", fontSize: "12px" }}>
              {" "}
              {console.log("rowData:----------->>>>", rowData)}
              {rowData?.fileMethod}
            </Stack>
            <Stack sx={{ display: "flex", fontSize: "12px" }}>
              {rowData?.fileName}
            </Stack>
          </Stack> */}
  
          <TopHeader
            rowData={rowData}
            checkAPIMethod={checkAPIMethod}
            checkFileName={checkFileName}
            selectedFileData={selectedFileData}
            setSelectedFileData={setSelectedFileData}
          />
        </Stack>
        {/*Breadcrumns Folder name & File name and Save button */}
        <Stack
          sx={{
            // border: "1px solid blue",
            height: "4%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              height: "28px",
              width: "20px",
              marginLeft: "4px",
              marginRight: "8px",
            }}
          >
            {" "}
            <img
              src={httpImg}
              alt="http logo"
              style={{ height: "100%", width: "100%" }}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Typography
                color="inherit"
                sx={{ display: "flex", fontSize: "16px", alignItems: "center" }}
                onClick={handleTypographyClick1}
              >
                {/* {rowData?.parentRowName} */}
                {isEditing1 ? (
                  <TextField
                    value={newFileName1}
                    onChange={handleTextFieldChange1}
                    onBlur={handleSave1} // Save when the TextField loses focus
                    onKeyPress={handleKeyPress1} // Save on "Enter" key press
                    autoFocus
                    variant="outlined"
                    size="small"
                    sx={{
                      fontSize: "16px",
                      width: "150px",
                      height: "20px",
                      marginBottom: "20px",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      "&:hover": {
                        backgroundColor: "#d2d4d2", // Hover effect color
                      },
                    }}
                  >
                    {/* {rowData?.fileName} */}
                    {localData31?.name || rowData?.parentRowName}
                    {/* {"----"} */}
                    {/* {rowData?.childRowId} */}
                    {/* {rowData?.parentRowName} */}
                  </Typography>
                )}
              </Typography>
              <Typography
                component="div" // Change the component to div
                sx={{
                  color: "text.primary",
                  display: "flex",
                  fontSize: "16px",
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
                      fontSize: "16px",
                      width: "150px",
                      height: "20px",
                      marginBottom: "20px",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      "&:hover": {
                        backgroundColor: "#d2d4d2", // Hover effect color for file row
                      },
                    }}
                  >
                    {/* {rowData?.fileName} */}
                    {localData3?.name || rowData?.fileName}
                    {/* {"----"} */}
                    {/* {rowData?.childRowId} */}
                  </Typography>
                )}
              </Typography>
            </Breadcrumbs>
  
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                marginRight: "8px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  // height: "80%",
                  fontSize: "16px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: "4px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                  // padding: "8px",
                  "&:hover": {
                    backgroundColor: "#ededed", // Background color on hover
                  },
                  border: "1px solid #ededed",
                }}
                onClick={handleSaveData}
              >
                {" "}
                <Stack>
                  <IoSaveOutline />
                </Stack>{" "}
                <Stack>Save</Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/*Api Calling */}
        <Stack
          sx={{
            // border: "2px solid green",
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
                  sx={{
                    "& .MuiSelect-select": {
                      fontWeight: 700,
                      color: getSelectValueColor(
                        localData.apiMethod || apiMethod
                      ), // Dynamically set the color
                    },
                  }}
                >
                  <MenuItem value="GET" sx={{ fontWeight: 700, color: "green" }}>
                    GET
                  </MenuItem>
                  <MenuItem
                    value="POST"
                    sx={{ fontWeight: 700, color: "orange" }}
                  >
                    POST
                  </MenuItem>
                  <MenuItem value="PUT" sx={{ fontWeight: 700, color: "blue" }}>
                    PUT
                  </MenuItem>
                  <MenuItem value="DELETE" sx={{ fontWeight: 700, color: "red" }}>
                    DELETE
                  </MenuItem>
                  <MenuItem
                    value="PATCH"
                    sx={{ fontWeight: 700, color: "violet" }}
                  >
                    PATCH
                  </MenuItem>
                  <MenuItem value="HEAD" sx={{ fontWeight: 700, color: "green" }}>
                    HEAD
                  </MenuItem>
                  <MenuItem
                    value="OPTION"
                    sx={{ fontWeight: 700, color: "#f54088" }}
                  >
                    OPTION
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack sx={{ width: "80%" }}>
              {/* <TextField
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
              /> */}
  
              <TextField
                // label="Query String"
                size="small"
                // value={queryString1} // Bind the state value to the input
                value={queryString1 || urlData || ""}
                fullWidth
                inputRef={inputRef} // Attach the ref
                // variant="outlined"
                onChange={handleChange1} // Handle input change
                // sx={{ marginBottom: "16px" }}
              />
            </Stack>
            <Stack sx={{ width: "10%", marginLeft: "8px" }}>
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
                {/* {paramsMenu && (
                    <Params
                      selectedRows={selectedRows}
                      handleSelectedRowsChange={handleSelectedRowsChange}
                    />
                  )} */}
  
                {paramsMenu && (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {/* <Stack sx={{ padding: "16px" }}>Query Params</Stack> */}
                    {/* <TextField
                      label="Query String"
                      value={queryString1} // Bind the state value to the input
                      fullWidth
                      variant="outlined"
                      onChange={handleChange1} // Handle input change
                      sx={{ marginBottom: "16px" }}
                    /> */}
  
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox
                                icon={<MdCheckBoxOutlineBlank />}
                                checkedIcon={<MdCheckBox />}
                              />
                            </TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {console.log(
                            "postmanParams:==========>>>>",
                            postmanParams
                          )} */}
                          {postmanParams.map((param, index) => (
                            <TableRow key={param.id || index}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={param.checked}
                                  icon={<MdCheckBoxOutlineBlank />}
                                  checkedIcon={<MdCheckBox />}
                                  onChange={(e) => {
                                    handleCheckboxChange(index, e.target.checked);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  size="small"
                                  fullWidth
                                  value={param.key}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  size="small"
                                  fullWidth
                                  value={param.value}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  size="small"
                                  fullWidth
                                  value={param.description}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                {/* Don't allow deletion of the last empty row */}
                                {postmanParams.length > 1 && (
                                  <IconButton onClick={() => handleDelete(index)}>
                                    <RiDeleteBin5Line />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
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
        <Stack sx={{ borderTop: "1px solid #ddd", height: "30%" }}>
          <Stack sx={{ overflowY: "auto" }}>
            {" "}
            <JSONWithLineNumbers
              json={responseData}
              responseTime={responseTime}
              statusCode={statusCode}
              responseSize={responseSize}
              lastCallTime={lastCallTime}
              errorMessage={errorMessage}
              errorApi={errorApi} // Pass errorApi
              rowData={rowData}
              errorLogDataValue={errorLogDataValue}
              errorMessage1={errorMessage1}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  };
  
  export default Postman;
  