import {
    InputAdornment,
    Stack,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Menu,
    MenuItem,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { FaPlus } from "react-icons/fa6";
  import { IoEllipsisHorizontalSharp } from "react-icons/io5";
  import { LuListFilter } from "react-icons/lu";
  import { RiFolderAddLine } from "react-icons/ri";
  import { BsFolder } from "react-icons/bs";
  import Postman from "./Postman";
  
  const HomePage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [collectionData, setCollectionData] = useState([]); // State to hold collection data
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [subAnchorEl, setSubAnchorEl] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState(null); // For managing selected file in a folder
    const [newFileName, setNewFileName] = useState(""); // For managing new file name
    const [newMethodName, setNewMethodName] = useState(""); // For managing new file name
    const [selectedFileData, setSelectedFileData] = useState(null); // Store file details to pass to Postman
  
    // Load collection data from localStorage when the component mounts
    useEffect(() => {
      const storedData = localStorage.getItem("collectionData");
      if (storedData) {
        // Parse and set the data if available
        const parsedData = JSON.parse(storedData);
        const updatedData = parsedData.map((collection) => ({
          ...collection,
          files: collection.files || [], // Ensure 'files' is initialized as an empty array
        }));
        setCollectionData(updatedData);
      }
    }, []);
  
    // Update localStorage whenever collectionData changes
    useEffect(() => {
      if (collectionData.length > 0) {
        localStorage.setItem("collectionData", JSON.stringify(collectionData)); // Save to localStorage
      }
    }, [collectionData]);
  
    const handleDialogOpen = () => {
      setOpenDialog(true);
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
    };
  
    const handleAddCollection = (name) => {
      // Generate a unique ID based on the current highest ID
      const maxId = collectionData.reduce(
        (max, collection) => Math.max(max, collection.id),
        0
      );
      const newCollection = {
        id: maxId + 1, // Generate a new ID
        name: name,
        files: [], // Initialize with an empty files array
      };
      setCollectionData([...collectionData, newCollection]);
      setOpenDialog(false); // Close dialog after adding collection
    };
  
    const handleMenuClick = (event, id) => {
      setAnchorEl(event.currentTarget); // Set the anchor element to the clicked button
      setSelectedMenuId(id); // Set the selected folder id to open the menu
    };
  
    const handleClose = () => {
      setAnchorEl(null); // Close menu
      setSelectedMenuId(null); // Reset selected menu id
    };
  
    const handleRemoveFolder = () => {
      // Filter out the collection with the selected id
      const filteredData = collectionData.filter(
        (collection) => collection.id !== selectedMenuId
      );
      setCollectionData(filteredData); // Update the collectionData state
  
      // Update localStorage after removing the collection
      localStorage.setItem("collectionData", JSON.stringify(filteredData));
  
      handleClose(); // Close the menu after deleting
    };
  
    // console.log("collectionData:==========>>>", collectionData);
  
    const handleRename = (id, name) => {};
    const handleSubClose = () => {};
  
    const handleSubRemoveFolder = () => {};
  
    const handleAddRequest = (id) => {
      // Add new file to the folder's files array
      const newFile = {
        id: new Date().getTime(), // Unique file id based on timestamp
        name: newFileName || "New Request", // Default name if empty
        method: newMethodName || "GET",
        items: [
          {
            apiMethod: "GET", // Default values for Postman details
            url: "",
            headers: [],
            bodyType: "none",
            authoriziedType: "noAuth",
            authData: {},
            rawType: "JSON",
            jsonData: {},
            headerParamsRows: [],
            headerHiddenRows: [],
            bodyFormData: [],
            bodyEncoddedRows: [],
            responseData: {},
          },
        ],
      };
  
      const updatedCollectionData = collectionData.map((collection) =>
        collection.id === id
          ? { ...collection, files: [...collection.files, newFile] } // Add new file to the folder
          : collection
      );
  
      setCollectionData(updatedCollectionData); // Update state
      localStorage.setItem(
        "collectionData",
        JSON.stringify(updatedCollectionData)
      ); // Save to localStorage
    };
  
    const handleDeleteFile = (folderId, fileId) => {
      // Remove the file from the collection
      const updatedCollectionData = collectionData.map((collection) =>
        collection.id === folderId
          ? {
              ...collection,
              files: collection.files.filter((file) => file.id !== fileId), // Remove the file
            }
          : collection
      );
  
      setCollectionData(updatedCollectionData); // Update state
      localStorage.setItem(
        "collectionData",
        JSON.stringify(updatedCollectionData)
      ); // Save to localStorage
    };
  
    const handleSubMenuClick = (
      folderId,
      folderName,
      fileId,
      fileName,
      fileMethod
    ) => {
      // Prepare the file details to pass to Postman component
      setSelectedFileData({
        parentRowId: folderId,
        parentRowName: folderName,
        childRowId: fileId,
        fileName: fileName,
        fileMethod: fileMethod,
      });
    };
  
    console.log("collectionData:----------->>>", collectionData);
    return (
      <Stack
        sx={{
          border: "1px solid red",
          height: "92vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Stack
          sx={{
            border: "1px solid green",
            height: "100%",
            width: "18%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            sx={{
              border: "1px solid #ddd",
              height: "5%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                width: "10%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDialogOpen}
            >
              <FaPlus />
            </Stack>
            <Stack sx={{ width: "80%" }}>
              <TextField
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LuListFilter size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              sx={{
                width: "10%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IoEllipsisHorizontalSharp />
            </Stack>
          </Stack>
          <Stack sx={{ border: "2px solid green", height: "95%" }}>
            {collectionData.map((collection) => (
              <Stack
                key={collection.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-between",
                  // border: "1px solid red",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // border: "1px solid red",
                  }}
                >
                  <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        paddingLeft: "8px",
                      }}
                    >
                      {" "}
                      <BsFolder style={{ position: "relative", bottom: "2px" }} />
                    </Stack>
  
                    <Stack>{collection.name}</Stack>
                  </Stack>
  
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: "8px",
                      // border: "1px solid red",
                    }}
                    onClick={(event) => handleMenuClick(event, collection.id)}
                  >
                    <IoEllipsisHorizontalSharp size={18} />
                  </Stack>
                </Stack>
  
                <Menu
                  anchorEl={anchorEl}
                  open={selectedMenuId === collection.id}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      width: 250, // Adjust the width of the menu
                      padding: 0,
                    },
                  }}
                >
                  <MenuItem onClick={() => handleAddRequest(collection.id)}>
                    Add request
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleRename(collection.id, collection.name)}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Duplicate</MenuItem>
                  <MenuItem onClick={handleClose}>Export</MenuItem>
                  <MenuItem sx={{ color: "red" }} onClick={handleRemoveFolder}>
                    Delete
                  </MenuItem>
                </Menu>
  
                {/* Show files within the folder */}
                <Stack sx={{ paddingLeft: "20px", paddingTop: "5px" }}>
                  {/* {console.log("collection121:==================>>>", collection)} */}
                  {collection.files.map((file) => (
                    <Stack
                      key={file.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack
                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                        onClick={() => {
                          handleSubMenuClick(
                            collection.id,
                            collection.name,
                            file.id,
                            file.name,
                            file.method
                          );
                        }}
                      >
                        <Stack sx={{ fontSize: "12px" }}>
                          {file.method || "GET"}
                        </Stack>
                        <Stack sx={{ fontSize: "12px" }}>
                          {file.name || "New Request"}
                        </Stack>
                      </Stack>
  
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingRight: "8px",
                        }}
                      >
                        <IoEllipsisHorizontalSharp
                          size={18}
                          onClick={(event) => setSubAnchorEl(event.currentTarget)}
                        />
                      </Stack>
  
                      <Menu
                        anchorEl={subAnchorEl}
                        PaperProps={{
                          sx: {
                            width: 250, // Adjust the width of the menu
                            padding: 0,
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleDeleteFile(collection.id, file.id)}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack sx={{ border: "1px solid blue", height: "100%", width: "82%" }}>
          {/* <Postman rowData={selectedFileData} /> */}
          {selectedFileData && <Postman rowData={selectedFileData} />}
        </Stack>
  
        {/* Dialog Box */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Create a New Collection</DialogTitle>
          <DialogContent>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light grey color for hover
                },
              }}
              onClick={() => handleAddCollection("New Collection")}
            >
              <Stack>
                <RiFolderAddLine />
              </Stack>
              <Stack>Blank Collection</Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    );
  };
  
  export default HomePage;
  