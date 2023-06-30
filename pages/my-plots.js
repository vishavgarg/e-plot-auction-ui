import Layout1 from "@/layout/layout1";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const MyPlots = () => {
  const [myPlots, setMyPlots] = React.useState([]);
  const getAllWinningBids = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}payment`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      );
      const plotsList = await response.json();
      console.log(plotsList)
      if (response.status === 200) {
        setMyPlots(plotsList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllWinningBids();
  }, []);
  return (
    <Layout1 title="My Plots">
      {myPlots && myPlots.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Paid amount</TableCell>
                <TableCell align="right">Purshased date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myPlots.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.winningbid.plot.name}
                  </TableCell>
                  <TableCell align="right">{row.paidAmount}</TableCell>
                  <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No plots yet</Typography>
      )}
    </Layout1>
  );
};

export default MyPlots;
