import Layout1 from "@/layout/layout1";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { ToastContext } from "@/context/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #666",
  borderRadius: "8px",
  boxShadow: 24,
  px: 4,
  py: 2,
};

const WinsPayment = () => {
  const [open, setOpen] = React.useState(false);
  const { setToast } = React.useContext(ToastContext);
  const [paymentBid, setPaymentBid] = React.useState({});
  const handleOpen = (bid) => {
    setOpen(true);
    setPaymentBid(bid);
  };
  const handleClose = () => setOpen(false);
  const [winningBids, setWinningBids] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const name = data.get("name");
      const cardDetails = data.get("card");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            winningbidId: paymentBid.id,
            name,
            card: cardDetails,
            paidAmount: paymentBid.bidAmount,
          }),
        }
      );
      const result = await response.json();
      handleClose();
      if (response.status === 200) {
        setToast("Payment completed successfully");
        getAllWinningBids();
      } else {
        setToast(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWinningBids = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}winningbids/list`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      );
      const winningBidsList = await response.json();
      if (response.status === 200) {
        setWinningBids(winningBidsList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllWinningBids();
  }, []);
  return (
    <Layout1 title="Wins & payment">
      {winningBids && winningBids.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {winningBids.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.plot.name}
                  </TableCell>
                  <TableCell align="right">{row.bidAmount}</TableCell>
                  <TableCell align="right">
                    <Link
                      href=""
                      onClick={() => handleOpen(row)}
                      style={{ color: "green" }}
                    >
                      Pay now
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No wins yet</Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            margin="auto"
          >
            <Typography variant="h6" mb={2}>
              Payment details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="card"
                  label="Card Number"
                  type="text"
                  id="card"
                  autoComplete="card"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  id="amount"
                  autoComplete="amount"
                  value={paymentBid.bidAmount}
                  disabled
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </Modal>
    </Layout1>
  );
};

export default WinsPayment;
