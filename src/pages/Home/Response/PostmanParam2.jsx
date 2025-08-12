
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
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

// Function to generate a unique ID for each row
const generateUniqueId = () =>
  Date.now() + Math.random().toString(36).substr(2, 9); // Unique ID generation method

const PostmanParam2 = () => {
  const [queryString1, setQueryString1] = useState(""); // State to hold the query string
  const [postmanParams, setPostmanParams] = useState([]); // State to hold the Postman Params

  // Base URL
  const baseURL = "?";

  // Function to handle query string changes
  const handleChange1 = (event) => {
    const value = event.target.value;
    setQueryString1(value);

    // Check if '?' is in the string, and handle query key-value addition
    if (value.includes("?")) {
      const parts = value.split("?");
      const queryPart = parts[1];
      const keyValuePairs = queryPart.split("&");

      // Create or update the key-value pairs for each parameter
      const newParams = keyValuePairs.map((pair) => {
        const [key, val] = pair.split("="); // Split by "=" to get key and value
        return {
          id: generateUniqueId(),
          key: key || "",
          value: val || "",
          description: "",
          checked: key || val ? true : false, // Set checkbox true if either key or value is filled
        };
      });

      // Ensure that only one empty row exists
      if (newParams.length === 0 || newParams.length > 0) {
        newParams.push({
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        });
      }

      // Update state and localStorage with the new query params
      setPostmanParams(newParams);
      localStorage.setItem("postmanParams", JSON.stringify(newParams)); // Save to localStorage
    } else {
      // If the query string doesn't contain "?", reset the parameters but keep the empty row
      const updatedParams = [
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        },
      ];

      setPostmanParams(updatedParams);
      localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Save to localStorage
    }
  };

  // Function to handle key deletion in the table
  const handleDelete = (index) => {
    // Prevent deletion of the last empty row
    if (postmanParams.length > 1) {
      const updatedParams = [...postmanParams];
      updatedParams.splice(index, 1);
      setPostmanParams(updatedParams);
      localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage

      // Rebuild the query string based on the remaining rows
      const queryParts = updatedParams
        .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
        .map((param) => `${param.key}=${param.value}`);

      // Update the query string but keep the initial part intact
      const basePart = queryString1.split("?")[0];
      setQueryString1(`${basePart}?${queryParts.join("&")}`);
    }
  };

  // Function to update checkbox status and handle value deletion
  const handleInputChange = (index, field, value) => {
    const updatedParams = [...postmanParams];
    updatedParams[index][field] = value;

    // Automatically check the checkbox when either key or value is filled
    if (updatedParams[index].key !== "" || updatedParams[index].value !== "") {
      updatedParams[index].checked = true;
    } else {
      updatedParams[index].checked = false;
    }

    // Ensure that if both key and value are deleted, the checkbox is unchecked
    if (updatedParams[index].key === "" && updatedParams[index].value === "") {
      updatedParams[index].checked = false;
      // If both key and value are empty, remove the row from postmanParams
      updatedParams.splice(index, 1);
    }

    // Check if last row is being edited and if the last row has both key or value filled
    if (
      index === updatedParams.length - 1 &&
      (updatedParams[index].key !== "" || updatedParams[index].value !== "")
    ) {
      // Add a new row if both fields are filled
      updatedParams.push({
        id: generateUniqueId(),
        key: "",
        value: "",
        description: "",
        checked: false,
      });
    }

    // Update the table and localStorage with the changes
    setPostmanParams(updatedParams);
    localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage

    // Dynamically update the query string based on all rows
    const queryParts = updatedParams
      .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
      .map((param) => `${param.key}=${param.value}`);

    // Update the query string but keep the initial part intact
    const basePart = queryString1.split("?")[0];
    setQueryString1(`${basePart}?${queryParts.join("&")}`);
  };

  // Initialize state from localStorage on first render, but ensure an empty row exists
  useEffect(() => {
    const storedParams = JSON.parse(localStorage.getItem("postmanParams"));
    if (storedParams && storedParams.length > 0) {
      setPostmanParams(storedParams);
    } else {
      setPostmanParams([
        {
          id: generateUniqueId(),
          key: "",
          value: "",
          description: "",
          checked: false,
        },
      ]);
    }
  }, []);

  // Function to handle checkbox change and toggle query string
  const handleCheckboxChange = (index, checked) => {
    const updatedParams = [...postmanParams];
    updatedParams[index].checked = checked;

    // Update the table and localStorage with the changes
    setPostmanParams(updatedParams);
    localStorage.setItem("postmanParams", JSON.stringify(updatedParams)); // Update localStorage

    // Dynamically update the query string based on checked rows
    const queryParts = updatedParams
      .filter((param) => param.checked && (param.key || param.value)) // Only include checked rows
      .map((param) => `${param.key}=${param.value}`);

    // Update the query string but keep the initial part intact
    const basePart = queryString1.split("?")[0];
    setQueryString1(`${basePart}?${queryParts.join("&")}`);
  };

  console.log("queryString:-------------->>>>", queryString1);

  return (
    <Stack sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Stack sx={{ padding: "16px" }}>Query Params</Stack>
      <TextField
        label="Query String"
        value={queryString1} // Bind the state value to the input
        fullWidth
        variant="outlined"
        onChange={handleChange1} // Handle input change
        sx={{ marginBottom: "16px" }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
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
            {postmanParams.map((param, index) => (
              <TableRow key={param.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={param.checked}
                    icon={<MdCheckBoxOutlineBlank />}
                    checkedIcon={<MdCheckBox />}
                    onChange={(e) => {
                      handleCheckboxChange(index, e.target.checked);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={param.key}
                    onChange={(e) =>
                      handleInputChange(index, "key", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={param.value}
                    onChange={(e) =>
                      handleInputChange(index, "value", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    value={param.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  {/* Don't allow deletion of the last empty row */}
                  {postmanParams.length > 1 && (
                    <IconButton onClick={() => handleDelete(index)}>
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

export default PostmanParam2;
