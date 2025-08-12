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
  formData1,
  setFormData1,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [keyField, seKeyField] = useState("TEXT");

  const [imgFiles, setImgFiles] = useState([]); // State to hold image files
  const [rawData, setRawData] = useState({}); // State to hold raw text data

  const handleKeyFieldChange = (event, rowId) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, keyField: event.target.value } : row
    );
    setRows(newRows);
  };

  const [rows, setRows] = useState(() => {
    const storedRows = localStorage.getItem("bodyFormData");
    return storedRows
      ? JSON.parse(storedRows)
      : [
          {
            id: generateUniqueId(),
            key: "",
            value: "",
            description: "",
            checked: false,
            file: null,
            keyField: "TEXT",
          },
        ]; // Default row if no data in localStorage
  });

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

    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, file: file } : row
    );

    setRows(newRows);
  };

  // Handle image files update
  useEffect(() => {
    const imageFiles = rows.filter((row) => row.keyField === "FILES" && row.file);
    setImgFiles(imageFiles.map((row) => row.file));

    // Store text data (e.g., name, class, section) in rawData state
    const textData = rows.filter((row) => row.keyField === "TEXT");
    const formattedData = textData.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    setRawData(formattedData);
  }, [rows]);

  const selectedRows1 = rows.filter((row) => row.checked);

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
                      accept="image/*, .pdf, .docx"
                    />
                  ) : (
                    <TextField
                      size="small"
                      value={row.value}
                      onChange={(e) => handleChange(e, row.id, "value")}
                      type="text"
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
