import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaEllipsisH } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

// Function to generate a unique ID for each row
const generateUniqueId = () =>
  Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

const BodyFormData = ({
  selectedRows2,
  setSelectedRows2,
  imgFiles,
  rawData,
  setImgFiles,
  setRawData,
  rowData,
  initialData,
  localData,
  selectedRows3,
  setSelectedRows3,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [keyField, seKeyField] = useState("TEXT");
  
  const handleKeyFieldChange = (event, rowId) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, keyField: event.target.value } : row
    );
    setRows(newRows);
  };

 
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const initial = () => {
      const storedRows = localData?.bodyFormData;

      // Check if storedRows is an array and contains data
      if (Array.isArray(storedRows) && storedRows.length > 0) {
        // If bodyFormData contains data, return it with a blank row at the end
        return [
          ...storedRows
          
        ];
      }

      // If storedRows is empty or undefined, return the default row
      return [
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
          file: null,
          keyField: "TEXT",
        },
      ];
    };
    const test = initial();
    setRows(test);
  }, [localData]);  


  const handleChange = (e, rowId, column) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, [column]: e.target.value } : row
    );
    setRows(newRows);

    // Check if last row is modified, then add a new row
    const lastRow = rows[rows.length - 1];
    if (lastRow.key || lastRow.value || lastRow.description) {
      setRows([
        ...newRows,
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
          file: null,
          keyField: "TEXT",
        },
      ]);
    }
  };

  // Handle deleting a row
  const handleDelete = (rowId) => {
    setRows(rows.filter((row) => row.id !== rowId));
    setSelectedRows3(rows.filter((row) => row.id !== rowId));
  };

  // Handle the checkbox change for individual rows
  const handleCheckboxChange = (e, rowId) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, checked: e.target.checked } : row
    );
    setRows(newRows);

  };

  // Handle "Select All" checkbox change
  const handleSelectAll = (e) => {
    const newSelectAll = e.target.checked;
    setSelectAll(newSelectAll);
    setRows(rows.map((row) => ({ ...row, checked: newSelectAll })));
  };

  const handleFileChange = (e, rowId) => {
    const file = e.target.files[0]; // Assuming only one file is selected
    // console.log("formData77:-------------->>>", file);
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, file: file } : row
    );

    // console.log("formData77:-------------->>>", newRows);
    setRows(newRows);
  };

  // console.log("rows2323:--------->>>>", rows);
  useEffect(() => {
      setSelectedRows3(rows);
    }, [rows]); // Update selectedRows3 when rows change
  // setSelectedRows3(rows);
  const selectedRows1 = rows.filter((row) => row.checked);
  const selectedRows101 = rows.filter((row) => row.checked);

  // console.log("selectedRows324:=============>>>", selectedRows1);

  // Avoid infinite loops by checking if selectedRows has changed
  useEffect(() => {
    if (JSON.stringify(selectedRows1) !== JSON.stringify(selectedRows2)) {
      setSelectedRows2(selectedRows1);
    }
  }, [selectedRows1, selectedRows2, setSelectedRows2]);

  useEffect(() => {
    const imageFiles = selectedRows101.filter(
      (row) => row.keyField === "FILES" && row.file
    );

    const newImgFiles = imageFiles.map((row) => row.file);

    // Only update imgFiles if newImgFiles is different from the current imgFiles state
    if (
      newImgFiles.length !== imgFiles.length ||
      !newImgFiles.every((file, index) => file === imgFiles[index])
    ) {
      // console.log("newImgFiles1:==========>>>", newImgFiles);
      setImgFiles(newImgFiles);
    }

    // Store text data (e.g., name, class, section) in rawData state
    const textData = selectedRows101.filter((row) => row.keyField === "TEXT");
    const formattedData = textData.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});

    // Check if the formattedData is different from the current rawData
    if (JSON.stringify(formattedData) !== JSON.stringify(rawData)) {
      setRawData(formattedData);
    }
  }, [selectedRows101, rawData]);

  return (
    <Stack sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Stack sx={{ padding: "16px" }}>Query Params</Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
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
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={row.checked}
                    onChange={(e) => handleCheckboxChange(e, row.id)}
                    // onChange={(e) => {
                    //   handleCheckboxChange(e, row.id);
                    //   handleRowSelection(row);
                    // }}
                    icon={<MdCheckBoxOutlineBlank />}
                    checkedIcon={<MdCheckBox />}
                  />
                </TableCell>
                <TableCell sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    size="small"
                    value={row.key}
                    onChange={(e) => handleChange(e, row.id, "key")}
                    fullWidth
                    sx={{ width: "30%" }}
                  />

                  <Select
                    value={row.keyField}
                    onChange={(e) => handleKeyFieldChange(e, row.id)}
                    sx={{ width: "30%" }}
                    size="small"
                  >
                    <MenuItem value="TEXT">TEXT</MenuItem>
                    <MenuItem value="FILES">FILES</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  {row.keyField === "FILES" ? (
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, row.id)}
                      accept="image/*, .pdf, .docx" // Specify accepted file types if needed
                    />
                  ) : (
                    <TextField
                      size="small"
                      value={row.value}
                      onChange={(e) => handleChange(e, row.id, "value")}
                      type="text" // Change type based on keyField
                      fullWidth
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.description}
                    onChange={(e) => handleChange(e, row.id, "description")}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  {index === rows.length - 1 ? (
                    <></>
                  ) : (
                    <IconButton onClick={() => handleDelete(row.id)}>
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
  );
};

export default BodyFormData;
