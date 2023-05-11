// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: "1rem",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name: string, calories: number) {
//   return { name, calories };
// }

// const rows = [
//   createData("Frozen yoghurt", 159),
//   createData("Ice cream sandwich", 237),
//   createData("Eclair", 262),
//   createData("Cupcake", 305),
//   createData("Gingerbread", 356),
// ];

// const ResultsTable = () => {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ width: "10%" }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>문항번호</StyledTableCell>
//             <StyledTableCell>정답</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell>{row.calories}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ResultsTable;

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name: string, calories: string) {
  return { name, calories };
}

const rows = [
  createData("1", "O"),
  createData("2", "O"),
  createData("3", "O"),
  createData("4", "O"),
  createData("5", "X"),
  createData("6", "O"),
  createData("7", "O"),
  createData("8", "O"),
  createData("9", "O"),
  createData("10", "X"),
  createData("11", "O"),
  createData("12", "O"),
  createData("13", "X"),
  createData("14", "O"),
  createData("15", "O"),
];

const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const ResultsTable = () => {
  const chunkedRows = chunkArray(rows, 4);

  return (
    <>
      {chunkedRows.map((chunk, i) => (
        <Table sx={{ width: "10%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>문항번호</StyledTableCell>
              <StyledTableCell>정답</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chunk.map((row: any, j: number) => (
              <StyledTableRow key={`${i}-${j}`}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.calories}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default ResultsTable;
