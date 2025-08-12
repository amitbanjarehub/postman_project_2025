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
  
  const HomePage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [collectionData, setCollectionData] = useState([]); // State to hold collection data
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
  
    // Load collection data from localStorage when the component mounts
    useEffect(() => {
      const storedData = localStorage.getItem("collectionData");
      if (storedData) {
        setCollectionData(JSON.parse(storedData)); // Parse and set the data if available
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
  
    console.log("collectionData:==========>>>", collectionData);
  
    const handleRename = (id, name) => {};
    const handleSubClose = () => {};
    const handleSubMenuClick = () => {};
    const handleSubRemoveFolder = () => {};
    //   console.log("localStorageSaveData:==============>>>>", localStorageSaveData);
  
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
                  <MenuItem onClick={handleClose}>Add request</MenuItem>
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
              </Stack>
            ))}
  
            
          </Stack>
        </Stack>
        <Stack sx={{ border: "1px solid blue", height: "100%", width: "82%" }}>
          s
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
  