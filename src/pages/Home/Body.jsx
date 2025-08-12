import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BodyEncoded from "./BodyEncoded";
import BodyFormData from "./BodyFormData";
import BodyRaw from "./BodyRaw";
import BodyBinary from "./BodyBinary";

const Body = ({
  bodyType,
  setBodyType,
  raw,
  setRaw,
  jsonData,
  setJsonData,
  selectedRows2,
  setSelectedRows2,
  urlEncodedData,
  setUrlEncodedData,
  bodyBinaryFileName,
  setBodyBinaryFileName,
  imgFiles,
  rawData,
  setImgFiles,
  setRawData,
  rowData,
  initialData,
  localData,
  selectedRows3,
  setSelectedRows3,
  urlEncodedData4,
  setUrlEncodedData4,
}) => {
  
  const handleBodyTypeChange = (event) => {
    setBodyType(event.target.value);
  };

  const handleRawChange = (event) => {
    setRaw(event.target.value);
  };

  useEffect(() => {
    const updateApiMethodInLocalStorage = (rawData, bodyType) => {
      // Get the current collection data from localStorage
      const collectionData = JSON.parse(localStorage.getItem("collectionData"));

      // Find the collection that matches the parentRowId
      const updatedCollectionData = collectionData.map((collection) => {
        if (collection.id === rawData.parentRowId) {
          // Find the file inside the collection that matches childRowId
          const updatedItems = collection.files.map((file) => {
            if (file.id === rawData.childRowId) {
              // Update apiMethod in the correct file
              // console.log("fileDataInBody121:----------->>>>", file)
              return {
                ...file,
                items: file.items.map((item, index) =>
                  index === 0 ? { ...item, bodyType: bodyType } : item
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

    updateApiMethodInLocalStorage(rawData, bodyType);
    // Save bodyType localStorage whenever they change
    localStorage.setItem("bodyType", JSON.stringify(bodyType));
    localStorage.setItem("rawType", JSON.stringify(raw));
  }, [bodyType, raw, rawData]);

  return (
    <Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Radio Buttons for different options */}
        <FormControl>
          <RadioGroup
            row
            value={bodyType}
            onChange={handleBodyTypeChange}
            sx={{ flexDirection: "row" }}
          >
            <FormControlLabel value="none" control={<Radio />} label="none" />
            <FormControlLabel
              value="form-data"
              control={<Radio />}
              label="form-data"
            />
            <FormControlLabel
              value="x-www-form-urlencoded"
              control={<Radio />}
              label="x-www-form-urlencoded"
            />
            <FormControlLabel value="raw" control={<Radio />} label="raw" />
            <FormControlLabel
              value="binary"
              control={<Radio />}
              label="binary"
            />
            <FormControlLabel
              value="GraphQL"
              control={<Radio />}
              label="GraphQL"
            />
          </RadioGroup>
        </FormControl>

        {/* Dropdown for selecting raw format */}
        {bodyType === "raw" && (
          <Stack>
            <Select
              value={raw}
              onChange={handleRawChange}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none", // Removes the border
                },
              }}
            >
              <MenuItem value="JSON">JSON</MenuItem>
              <MenuItem value="TEXT">TEXT</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="XML">XML</MenuItem>
              <MenuItem value="HTML">HTML</MenuItem>
            </Select>
          </Stack>
        )}
      </Stack>
      <Stack>
        {bodyType === "form-data" && (
          <BodyFormData
            selectedRows2={selectedRows2}
            setSelectedRows2={setSelectedRows2}
            imgFiles={imgFiles}
            rawData={rawData}
            setImgFiles={setImgFiles}
            setRawData={setRawData}
            rowData={rowData}
            initialData={initialData}
            localData={localData}
            selectedRows3={selectedRows3}
            setSelectedRows3={setSelectedRows3}
          />
        )}
        {bodyType === "x-www-form-urlencoded" && (
          <BodyEncoded
            urlEncodedData={urlEncodedData}
            setUrlEncodedData={setUrlEncodedData}
            rowData={rowData}
            initialData={initialData}
            localData={localData}
            urlEncodedData4={urlEncodedData4}
            setUrlEncodedData4={setUrlEncodedData4}
          />
        )}
        {bodyType === "raw" && (
          <BodyRaw
            rawData={raw}
            jsonData={jsonData}
            setJsonData={setJsonData}
            rowData={rowData}
          />
        )}

        {bodyType === "binary" && (
          <BodyBinary
            bodyBinaryFileName={bodyBinaryFileName}
            setBodyBinaryFileName={setBodyBinaryFileName}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Body;
