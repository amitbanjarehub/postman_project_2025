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

const BodyEncoded = ({
  urlEncodedData,
  setUrlEncodedData,
  rowData,
  initialData,
  localData,
  urlEncodedData4,
  setUrlEncodedData4,
}) => {
  // const [rows, setRows] = useState([
  //   { id: 1, key: "", value: "", description: "", checked: false },
  // ]);

  // const [rows, setRows] = useState(() => {
  //   const storedRows = localStorage.getItem("bodyEncoddedRows");
  //   return storedRows
  //     ? JSON.parse(storedRows)
  //     : [
  //         {
  //           id: generateUniqueId(),
  //           key: "",
  //           value: "",
  //           description: "",
  //           checked: false,
  //         },
  //       ]; // Default row if no data in localStorage
  // });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const initial = () => {
      const storedRows = localData?.bodyEncoddedRows;

      // Check if storedRows is an array and contains data
      if (Array.isArray(storedRows) && storedRows.length > 0) {
        // If bodyFormData contains data, return it with a blank row at the end
        return [
          ...storedRows,
          // {
          //   id: generateUniqueId(),
          //   key: "",
          //   value: "",
          //   description: "",
          //   checked: false,
          // },
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
        },
      ];
    };
    const test = initial();
    setRows(test);
  }, [localData]);

  const [selectAll, setSelectAll] = useState(false);

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
    setUrlEncodedData4(rows.filter((row) => row.id !== rowId));
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
  // setUrlEncodedData4(rows);
  const selectedRows = rows.filter((row) => row.checked);

  // console.log("Encoded_selectedRows:=============>>>", selectedRows);

  // const selectedRows1 = rows.filter((row) => row.checked);

  // Avoid infinite loops by checking if selectedRows has changed
  useEffect(() => {
    if (JSON.stringify(selectedRows) !== JSON.stringify(urlEncodedData)) {
      setUrlEncodedData(selectedRows);
    }
  }, [selectedRows, urlEncodedData, setUrlEncodedData]);

  // Save rows data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bodyEncoddedRows", JSON.stringify(rows));
    setUrlEncodedData4(rows);
  }, [rows]);

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

export default BodyEncoded;
