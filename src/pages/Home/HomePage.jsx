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
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedMenuId1, setSelectedMenuId1] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null); // For managing selected file in a folder
  const [newFileName, setNewFileName] = useState(""); // For managing new file name
  const [newMethodName, setNewMethodName] = useState(""); // For managing new file name
  const [selectedFileData, setSelectedFileData] = useState(null); // Store file details to pass to Postman
  const [initialData, setInitialData] = useState([]);
  const [trigredMethod, setTrigredMethod] = useState(""); // For managing new file name
  const [trigredFileName, setTrigredFileName] = useState(""); // For managing new file name
  const [trigredFileName1, setTrigredFileName1] = useState(""); // For managing new file name
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const [openDialog1, setOpenDialog1] = useState(false);
  const [file_name, setFileNameData] = useState(""); // State for the dynamic file name
  const [file_id, setFileIdData] = useState(""); // State for the dynamic file name
  const [collection_id, setCollectionIdData] = useState(""); // State for the dynamic file name

  // Function to handle opening the dialog
  const handleDeleteClick = (collectionId1, fileId1, fileName1) => {
    handleClose1();
    setFileNameData(fileName1);
    setFileIdData(fileId1);
    setCollectionIdData(collectionId1);
    setOpenDialog1(true); // Show the dialog when the delete button is clicked
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog1(false); // Close the dialog
  };

  // Load collection data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("collectionData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = parsedData.map((collection) => ({
        ...collection,
        files: collection.files || [], // Ensure 'files' is initialized as an empty array
      }));
      setCollectionData(updatedData);
    }
  }, []);

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
  }, [trigredMethod, trigredFileName, trigredFileName1]);

  // Update localStorage whenever collectionData changes
  useEffect(() => {
    if (collectionData.length > 0) {
      localStorage.setItem("collectionData", JSON.stringify(collectionData)); // Save to localStorage
    }
  }, [collectionData]);

  // Handle change in the search field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term based on user input
  };

  // Filtered collection data based on the search term
  const filteredCollectionData = collectionData.filter((collection) => {
    const collectionMatches =
      collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.files.some((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return collectionMatches;
  });

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

  const handleMenuClick1 = (event, id) => {
    setAnchorEl1(event.currentTarget); // Set the anchor element to the clicked button
    setSelectedMenuId1(id); // Set the selected folder id to open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close menu
    setSelectedMenuId(null); // Reset selected menu id
  };

  const handleClose1 = () => {
    setAnchorEl1(null); // Close menu
    setSelectedMenuId1(null); // Reset selected menu id
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

  // Function to generate a unique ID for each row
  const generateUniqueId = () =>
    Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

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
          urlText: "",
          bodyType: "none",
          authoriziedType: "noAuth",
          authData: {},
          rawType: "JSON",
          jsonData: {},
          headerParamsRows: [
            [
              {
                id: generateUniqueId(),
                key: "",
                value: "",
                description: "",
                checked: false,
              },
            ],
          ],
          errorLogs: [],
          headerHiddenRows: [
            {
              id: generateUniqueId(),
              key: "Cache-Control",
              value: "no-cache",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "VertexSuite-Token",
              value: "<calculated when request is sent>",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "User-Agent",
              value: "VertexSuite",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "Accept",
              value: "*/*",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "Accept-Encoding",
              value: "gzip, deflate, br",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "Connection",
              value: "keep-alive",
              description: "",
              checked: true,
            },
            {
              id: generateUniqueId(),
              key: "",
              value: "",
              description: "",
              checked: false,
            },
          ],
          bodyFormData: [],
          bodyEncoddedRows: [],
          responseData: [],
          responseTime: null,
          lastCallTime: null,
          statusCode: null,
          responseSize: null,
          paramsMenu: false,
          authorizationMenu: false,
          headersMenu: false,
          bodyMenu: true,
          scriptsMenu: false,
          settingsMenu: false,
          errorMsg: null,
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
    setOpenDialog1(false);
    // console.log("folderId:------>>>", folderId);
    // console.log("fileId:------>>>", fileId);
    // Filter through the collection data to find the collection by folderId
    const filteredData = collectionData.map((collection) => {
      if (collection.id === folderId) {
        // Filter out the file to delete from the files array of the collection
        collection.files = collection.files.filter(
          (file) => file.id !== fileId
        );
      }
      return collection;
    });

    // Update the collectionData state
    setCollectionData(filteredData);

    // Update localStorage after removing the file
    localStorage.setItem("collectionData", JSON.stringify(filteredData));

    handleClose(); // Close the menu after deleting
  };

  const handleInitial = (
    folderId,
    folderName,
    fileId,
    fileName,
    fileMethod
  ) => {
    const collectionData = JSON.parse(localStorage.getItem("collectionData"));

    if (collectionData) {
      // collectionData ko map karein
      collectionData.forEach((collection) => {
        // Condition match karein
        if (collection.id === folderId) {
          collection.files.forEach((file) => {
            if (file.id === fileId) {
              // Jab match ho, items array ko localData state mein set karein
              // console.log("file121:--------------->>>", file.items);
              setInitialData(file.items[0]); // file.items ko set karenge state mein
            }
          });
        }
      });
    }
  };

  // console.log("setInitialData", initialData);
  const handleSubMenuClick = (
    folderId,
    folderName,
    fileId,
    fileName,
    fileMethod
  ) => {
    // // Refresh the page
    // window.location.reload();
    // Prepare the file details to pass to Postman component
    setSelectedFileData({
      parentRowId: folderId,
      parentRowName: folderName,
      childRowId: fileId,
      fileName: fileName,
      fileMethod: fileMethod,
    });

    handleInitial(folderId, folderName, fileId, fileName, fileMethod);
  };

  // console.log("collectionData:----------->>>", collectionData);

  const getTextColor = (value) => {
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
        // border: "1px solid red",
        height: { xl: "99vh", lg: "94vh", md: "92vh", sm: "92vh", xs: "90vh" },
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Stack
        sx={{
          // border: "4px solid green",
          height: "100%",
          // width: "18%",
          width: { xl: "18%", lg: "18%", md: "21%", sm: "27%", xs: "30%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          sx={{
            // border: "1px solid #ddd",
            height: "5%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
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
              value={searchTerm} // Bind the value of the search field to the searchTerm state
              onChange={handleSearchChange} // Update the searchTerm state on input change
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
        <Stack
          sx={{
            // border: "2px solid green",
            height: "95%",
            backgroundColor: "#f2f2f2",
          }}
        >
          {filteredCollectionData.length > 0 ? (
            filteredCollectionData.map((collection) => (
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
                    "&:hover": {
                      backgroundColor: "#d2d4d2", // Hover effect color for file row
                    },
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
                      <BsFolder
                        style={{ position: "relative", bottom: "2px" }}
                      />
                    </Stack>

                    <Stack>
                      {/* {collection.name} */}
                      {collection.name.length > 16
                        ? `${collection.name.slice(0, 15)}...`
                        : collection.name}
                    </Stack>
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
                <Stack sx={{ paddingLeft: "32px", paddingTop: "5px" }}>
                  {/* {console.log("collection121:==================>>>", collection)} */}
                  {collection.files.map((file) => (
                    <Stack
                      key={file.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        "&:hover": {
                          backgroundColor: "#d2d4d2", // Hover effect color for file row
                        },
                        backgroundColor:
                          selectedFileId === file.id
                            ? "#d2d4d2"
                            : "transparent", // Apply yellow background if file is selected
                      }}
                      onClick={() => {
                        setSelectedFileId(file.id); // Set the selected file ID
                        handleSubMenuClick(
                          collection.id,
                          collection.name,
                          file.id,
                          file.name,
                          file.method
                        );
                      }}
                    >
                      <Stack
                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                      >
                        {/* <Stack sx={{ fontSize: "12px" }}>
                         
                          {file?.items[0]?.apiMethod || "GET"}
                        </Stack> */}

                        <Stack
                          sx={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: getTextColor(
                              file?.items[0]?.apiMethod || "GET"
                            ), // Dynamically set the color
                          }}
                        >
                          {file?.items[0]?.apiMethod || "GET"}
                        </Stack>

                        <Stack sx={{ fontSize: "12px" }}>
                          {file.name.length > 16
                            ? `${file.name.slice(0, 15)}...`
                            : file.name || "New Request"}
                          {/* {file.name || "New Request"} */}
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
                        onClick={(event) => handleMenuClick1(event, file.id)}
                      >
                        <IoEllipsisHorizontalSharp size={18} />
                      </Stack>

                      <Menu
                        anchorEl={anchorEl1}
                        open={selectedMenuId1 === file.id}
                        onClose={handleClose1}
                        PaperProps={{
                          sx: {
                            width: 250, // Adjust the width of the menu
                            padding: 0,
                          },
                        }}
                      >
                        <MenuItem onClick={handleClose1}>Share</MenuItem>
                        <MenuItem onClick={handleClose1}>Copy link</MenuItem>
                        <MenuItem
                          sx={{ color: "red" }}
                          // onClick={() => handleDeleteFile(collection.id, file.id)}
                          onClick={() =>
                            handleDeleteClick(collection.id, file.id, file.name)
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            ))
          ) : (
            <Stack
              sx={{
                padding: "20px",
                fontSize: "16px",
                textAlign: "center",
                color: "#888",
              }}
            >
              No data found.
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{
          height: "100%",
          width: { xl: "82%", lg: "82%", md: "79%", sm: "73%", xs: "70%" },
          paddingLeft: "12px",
          paddingRight: "4px",
          // border: "4px solid blue",
        }}
      >
        {/* <Postman rowData={selectedFileData} /> */}
        {selectedFileData && (
          <Postman
            rowData={selectedFileData}
            initialData={initialData}
            setInitialData={setInitialData}
            trigredMethod={trigredMethod}
            setTrigredMethod={setTrigredMethod}
            trigredFileName={trigredFileName}
            setTrigredFileName={setTrigredFileName}
            trigredFileName1={trigredFileName1}
            setTrigredFileName1={setTrigredFileName1}
            selectedFileData={selectedFileData}
            setSelectedFileData={setSelectedFileData}
          />
         
        )}
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

      {/* Dialog box that asks for confirmation */}
      <Dialog open={openDialog1} onClose={handleCloseDialog}>
        <DialogTitle>Delete "{file_name}"?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {file_name}?
        </DialogContent>
        <DialogActions>
          {/* Cancel button to close the dialog */}
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {/* Delete button that triggers deletion */}
          <Button
            // onClick={handleDeleteFile(collection_id, file_id)}
            onClick={() => handleDeleteFile(collection_id, file_id)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default HomePage;
