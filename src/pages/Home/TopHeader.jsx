import React, { useState, useEffect, useRef } from "react";
import { Stack, Chip, Typography } from "@mui/material";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";

const TopHeader = ({
  rowData,
  checkAPIMethod,
  checkFileName,
  selectedFileData,
  setSelectedFileData,
}) => {
  const [topHeader, setTopHeader] = useState([]);
  const scrollContainerRef = useRef(null); // Create a reference to the scroll container
  // Function to handle adding data to localStorage and updating state

  const saveToLocalStorageData = (rowData) => {
    // Retrieve existing data from localStorage
    let topHeaderData = JSON.parse(localStorage.getItem("topHeader")) || [];

    // Check if the rowData already exists in localStorage
    const existingItemIndex = topHeaderData.findIndex(
      (item) =>
        item.childRowId === rowData.childRowId &&
        item.parentRowId === rowData.parentRowId
    );

    if (existingItemIndex !== -1) {
      // If a match is found, check if fileMethod or fileName is different
      const existingItem = topHeaderData[existingItemIndex];

      if (
        existingItem.fileMethod !== rowData.fileMethod ||
        existingItem.fileName !== rowData.fileName
      ) {
        // Update the fileMethod and fileName if they are different
        topHeaderData[existingItemIndex] = {
          ...existingItem, // Keep the other fields intact
          fileMethod: rowData.fileMethod,
          fileName: rowData.fileName,
        };

        // Log for debugging
        // console.log("Updated existing item:", topHeaderData[existingItemIndex]);
      } else {
        console.log("No update needed, fileMethod and fileName are the same.");
      }
    } else {
      // If it's not a duplicate, add it to the array
      topHeaderData.push({
        parentRowId: rowData.parentRowId,
        parentRowName: rowData.parentRowName,
        childRowId: rowData.childRowId,
        fileName: rowData.fileName,
        fileMethod: rowData.fileMethod,
      });

      // Log for debugging
      console.log("Added new item:", rowData);
    }

    // Save the updated array back to localStorage
    localStorage.setItem("topHeader", JSON.stringify(topHeaderData));
  };

  const updateTopHeaderFromCollectionData = () => {
    const collectionData = JSON.parse(localStorage.getItem("collectionData"));
    // Retrieve the existing topHeader from localStorage
    let topHeader = JSON.parse(localStorage.getItem("topHeader")) || [];

    // Loop through each collection in collectionData
    collectionData.forEach((collection) => {
      collection.files.forEach((file) => {
        // Find the matching entry in topHeader
        const index = topHeader.findIndex(
          (item) =>
            item.parentRowId === collection.id && item.childRowId === file.id
        );

        // If a matching item is found
        if (index !== -1) {
          const item = topHeader[index];

          // Check if fileName or fileMethod are different
          if (
            item.fileName !== file.name ||
            item.fileMethod !== file.items[0].apiMethod
          ) {
            // Update fileName and fileMethod with the data from collectionData
            topHeader[index] = {
              ...item, // Preserve other fields
              fileName: file.name,
              fileMethod: file.items[0].apiMethod,
            };

            // console.log(`Updated item in topHeader:`, topHeader[index]);
          }
        }
      });
    });

    // Save the updated topHeader back to localStorage
    localStorage.setItem("topHeader", JSON.stringify(topHeader));
    let topHeaderData = JSON.parse(localStorage.getItem("topHeader")) || [];
    setTopHeader(topHeaderData); // Update the state immediately
  };

  // Trigger the save function whenever rowData changes
  useEffect(() => {
    if (rowData) {
      saveToLocalStorageData(rowData);
    }
    let topHeaderData = JSON.parse(localStorage.getItem("topHeader")) || [];
    setTopHeader(topHeaderData); // Update the state immediately
    if (checkAPIMethod || checkFileName) {
      updateTopHeaderFromCollectionData();
    }
  }, [rowData, checkAPIMethod, checkFileName]);

  // Function to handle chip delete (remove from topHeader)
  const handleDelete = (childRowId) => {
    const updatedTopHeader = topHeader.filter(
      (item) => item.childRowId !== childRowId
    );
    setTopHeader(updatedTopHeader); // Update the state after deletion
    localStorage.setItem("topHeader", JSON.stringify(updatedTopHeader)); // Update localStorage
  };

  const handlePostman = (item) => {
    //  console.log("alertData:===========>>>", item);
    setSelectedFileData(item); // top Header se Api change kr payenge
  };

  // Function to handle left scroll
  const handleLeftScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 100; // Scroll left by 100px (adjust as needed)
    }
  };

  // Function to handle right scroll
  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100; // Scroll right by 100px (adjust as needed)
    }
  };
 

  return (
    // <Stack spacing={1} direction="row" flexWrap="nowrap"   sx={{
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "space-between",  // This will space out the left and right stacks
    //   alignItems: "center",
    //   width: "100%",  // Ensure the container takes full width
    // }}>
    //   <Stack
    //     sx={{ display: "flex", flexDirection: "row", alignItems: "center",  }}
    //   >
    //     <FaLessThan />
    //   </Stack>
    //   <Stack
    //     sx={{
    //       margin: "5px",
    //       overflowX: "auto", // Enable horizontal scrolling if content overflows
    //       whiteSpace: "nowrap", // Prevent wrapping of items to the next line
    //       display: "flex",
    //       flexDirection: "row",
    //       alignItems: "center",
    //       flexGrow: 1,  // This will ensure it takes up the remaining space
    //     }}
    //   >
    //     {topHeader.map((item) => (
    //       <Chip
    //         key={item.childRowId}
    //         label={`${item.fileMethod} - ${item.fileName}`} // Display fileMethod and fileName as label
    //         onDelete={() => handleDelete(item.childRowId)} // Handle delete action
    //         onClick={() => handlePostman(item)}
    //         sx={{ margin: "5px" }}
    //       />
    //     ))}
    //   </Stack>
    //   <Stack
    //     sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    //   >
    //     <FaGreaterThan />
    //   </Stack>
    // </Stack>

    <Stack
      spacing={1}
      direction="row"
      flexWrap="nowrap"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // This will space out the left and right stacks
        alignItems: "center",
        width: "100%", // Ensure the container takes full width
        height: "100%",
      }}
    >
      {/* Left Arrow */}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#e6e5e3",
          border: "1px solid #ddd",
          justifyContent: "center",
          width: "3%",
          height: "80%",
          "&:hover": {
            backgroundColor: "#e6e5e3", // Hover effect color
          },
        }}
        onClick={handleLeftScroll}
      >
        <FaLessThan style={{ cursor: "pointer" }} />
      </Stack>

      {/* Middle Stack (Chip List with no scrollbar visible) */}
      <Stack
        ref={scrollContainerRef} // Reference the scroll container
        sx={{
          margin: "5px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1, // This will ensure it takes up the remaining space
          overflow: "hidden", // Hide the default scrollbar
        }}
      >
        {topHeader.map((item, index) => (
          <React.Fragment key={item.childRowId}>
            <Chip
              label={`${item.fileMethod} - ${item.fileName}`} // Display fileMethod and fileName as label
              onDelete={() => handleDelete(item.childRowId)} // Handle delete action
              onClick={() => handlePostman(item)}
              sx={{
                margin: "5px",
                backgroundColor: "transparent", // Remove the background color
                border: "none", // Optional: add border if needed
                fontSize: "12px",
              
              }}
            />
            {/* Add "|" after each chip except the last one */}
            {index !== topHeader.length - 1 && (
              <Typography sx={{ margin: "0 5px" }}>|</Typography>
            )}
          </React.Fragment>
        ))}
      </Stack>

      {/* Right Arrow */}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#e6e5e3",
          border: "1px solid #ddd",
          justifyContent: "center",
          width: "3%",
          height: "80%",
          "&:hover": {
            backgroundColor: "#e6e5e3", // Hover effect color
          },
         
        }}
        onClick={handleRightScroll}
      >
        <FaGreaterThan style={{ cursor: "pointer" }} />
      </Stack>
    </Stack>
  );
};

export default TopHeader;
