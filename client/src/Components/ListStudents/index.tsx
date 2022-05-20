import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";

export const ListStudent = () => {
  const studentList = useContext(AppContext);

  if (!studentList) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>

            <TableCell>Họ và tên</TableCell>
            <TableCell align="center">Giới tính</TableCell>
            <TableCell>Ngày sinh</TableCell>

            <TableCell align="center">Email </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((value, key) => {
            return (
              <TableRow key={key}>
                <TableCell align="center">{key}</TableCell>
                <TableCell>{value.hoten}</TableCell>
                <TableCell align="center">{value.gioitinh}</TableCell>
                <TableCell>{value.ngaysinh as string}</TableCell>
                <TableCell align="center">{value.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
