// import React from 'react'

// const ResponseHeader = ({headerResData}) => {
//   return (
//     <div>ResponseHeader</div>
//   )
// }

// export default ResponseHeader

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ResponseHeader = ({ headerResData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Key</strong>
            </TableCell>
            <TableCell>
              <strong>Value</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {headerResData.map((data, index) =>
            Object.entries(data).map(([key, value]) => (
              <TableRow key={key + index}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponseHeader;
