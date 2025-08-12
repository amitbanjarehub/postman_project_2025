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
import { FaEllipsisH } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

// Function to generate a unique ID for each row
const generateUniqueId = () =>
  Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

const HeaderAutoGen = () => {
  
  const [selectedRows, setSelectedRows] = useState([]); // Lifted state
  const [rows, setRows] = useState([
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
      key: "Host",
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
  ]);

  
  const [selectAll, setSelectAll] = useState(false);
  const [queryString, setQueryString] = useState("");

  // Handle adding a new blank row when typing in the last row
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
  const selectedRows1 = rows.filter((row) => row.checked);

  //   console.log("selectedRows:=============>>>", selectedRows1);

  // Avoid infinite loops by checking if selectedRows has changed
  useEffect(() => {
    if (JSON.stringify(selectedRows1) !== JSON.stringify(selectedRows)) {
      setSelectedRows(selectedRows1);
    }
  }, [selectedRows1, selectedRows, setSelectedRows]);

  console.log("rows323------------->>>:", rows);
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
                  {index === rows.length - 1 ? (
                    <></>
                  ) : (
                    // <IconButton onClick={() => handleDelete(row.id)}>
                    //   <RiDeleteBin5Line />
                    // </IconButton>

                    index >= 7 && ( // Only show delete button for rows with index >= 7
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <RiDeleteBin5Line />
                      </IconButton>
                    )
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

export default HeaderAutoGen;
