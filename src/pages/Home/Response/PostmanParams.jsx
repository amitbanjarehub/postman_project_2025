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
} from "@mui/material";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

// Function to generate a unique ID for each row
const generateUniqueId = () =>
  Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

const PostmanParams = () => {
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem("headerParamsRows");
    // If there are no rows in localStorage, initialize with a default row
    if (!savedRows || savedRows === "[]") {
      const defaultRow = [
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        },
      ];
      localStorage.setItem("headerParamsRows", JSON.stringify(defaultRow)); // Add default row to localStorage
      return defaultRow;
    }
    return JSON.parse(savedRows);
  });

  const [selectAll, setSelectAll] = useState(false);
  const [queryString, setQueryString] = useState(""); // Independent state for query string

  // Handle adding a new blank row when typing in the last row
  const handleChange = (e, rowId, column) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, [column]: e.target.value } : row
    );
    setRows(newRows);

    // Get the last row to check if it should be modified or a new row should be added
    const lastRow = newRows[newRows.length - 1];

    // Only add a new row if the last row is not empty, key or value is modified
    if (
      (lastRow.key || lastRow.value || lastRow.description) &&
      rows.length < 2
    ) {
      setRows([
        ...newRows,
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        },
      ]);
    }

    // Save updated rows to localStorage
    localStorage.setItem("headerParamsRows", JSON.stringify(newRows));

    // Update queryString
    const query = newRows.map((row) => `${row.key}=${row.value}`).join("&");
    setQueryString(query);
  };

  // Handle deleting a row
  const handleDelete = (rowId) => {
    // Prevent deletion of the last empty row
    if (rows.length > 1) {
      const newRows = rows.filter((row) => row.id !== rowId);
      setRows(newRows);

      // Remove the row from localStorage
      localStorage.setItem("headerParamsRows", JSON.stringify(newRows));

      // Update queryString after deleting a row
      const query = newRows.map((row) => `${row.key}=${row.value}`).join("&");
      setQueryString(query);
    }
  };

  // Handle the checkbox change for individual rows
  const handleCheckboxChange = (e, rowId) => {
    const newRows = rows.map((row) =>
      row.id === rowId ? { ...row, checked: e.target.checked } : row
    );
    setRows(newRows);

    // Save updated rows to localStorage
    localStorage.setItem("headerParamsRows", JSON.stringify(newRows));

    // Update queryString
    const query = newRows.map((row) => `${row.key}=${row.value}`).join("&");
    setQueryString(query);
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = (e) => {
    const newSelectAll = e.target.checked;
    setSelectAll(newSelectAll);
    const newRows = rows.map((row) => ({ ...row, checked: newSelectAll }));
    setRows(newRows);

    // Save updated rows to localStorage
    localStorage.setItem("headerParamsRows", JSON.stringify(newRows));

    // Update queryString
    const query = newRows.map((row) => `${row.key}=${row.value}`).join("&");
    setQueryString(query);
  };

  // Sync query string when rows change
  useEffect(() => {
    const query = rows.map((row) => `${row.key}=${row.value}`).join("&");
    setQueryString(query);
  }, [rows]);

  // Handle input change for queryString
  const handleQueryStringChange = (e) => {
    const input = e.target.value;
    setQueryString(input);

    // Split input by '&' (to separate different key-value pairs)
    const params = input.split("&");

    const newRows = params
      .map((param) => {
        // Split each param by '=' to get key and value
        const [key, value] = param.split("=");

        if (key && value) {
          // Add to the rows array
          return {
            id: generateUniqueId(),
            key: key.trim(),
            value: value.trim(),
            description: "",
            checked: false,
          };
        }
        return null;
      })
      .filter((row) => row);

    // Add the new rows and save to localStorage
    setRows(newRows);
    localStorage.setItem("headerParamsRows", JSON.stringify(newRows));
  };

  // Add an empty row when typing `?`
  const handleQueryStringChangeWithQuestionMark = (e) => {
    const input = e.target.value;
    if (input.includes("?")) {
      // Add an empty row when '?' is typed
      setRows([
        ...rows,
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        },
      ]);
    }
    handleQueryStringChange(e);
  };

  return (
    <Stack sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Stack sx={{ padding: "16px" }}>Query Params</Stack>
      <TextField
        label="Query String"
        value={queryString}
        fullWidth
        variant="outlined"
        onChange={handleQueryStringChangeWithQuestionMark} // Capture the change and handle '?'
        sx={{ marginBottom: "16px" }}
      />
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
                <TableCell>
                  <TextField
                    size="small"
                    value={row.key}
                    onChange={(e) => handleChange(e, row.id, "key")}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.value}
                    onChange={(e) => handleChange(e, row.id, "value")}
                    fullWidth
                  />
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
                  {/* Don't allow deletion of the last empty row */}
                  {index !== rows.length - 1 && (
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

export default PostmanParams;
