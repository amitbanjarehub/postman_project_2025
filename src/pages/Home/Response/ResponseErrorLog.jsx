import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";

const ResponseErrorLog = ({ ErrorLogData }) => {
  return (
    <Stack>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 220, // Adjust the max height of the table
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Table stickyHeader aria-label="error logs" size="small">
          <TableBody>
            {ErrorLogData && ErrorLogData.length > 0 ? (
              ErrorLogData.map((log, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e6e6e6", // Hover effect color
                    },
                  }}
                >
                  <TableCell>
                    {log.date}, {log.time}
                  </TableCell>
                  <TableCell sx={{ color: "red" }}>
                    {log.status}, {log.errorMsg}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                  No error logs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ResponseErrorLog;
