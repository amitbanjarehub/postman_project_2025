import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FaMinus } from "react-icons/fa";
const AtuthorizationNoAuth = ({ authData1, setAuthData1, authoriziedType, rowData }) => {
  useEffect(() => {
    if (authoriziedType === "noAuth") setAuthData1({});
    const updateRowDataInLocalStorage = (rowData) => {
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
                        authData: {},
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

    updateRowDataInLocalStorage(rowData);
  }, [authoriziedType]);
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: 1,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "60px",
            width: "60px",
            borderRadius: "8px",
            backgroundColor: "#e6f1f5",
            // border: "1px solid red",
          }}
        >
          <FaMinus />
        </Stack>
        <Stack sx={{ fontWeight: 600 }}>No Auth</Stack>
        <Stack>This request does not use any authorization.</Stack>
      </Stack>
    </Stack>
  );
};

export default AtuthorizationNoAuth;
