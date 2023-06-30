import BidCard from "@/components/bidCard";
import { ToastContext } from "@/context/toast";
import Layout1 from "@/layout/layout1";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";

const Bids = () => {
  const [bids, setBids] = useState([]);
  const { setToast } = useContext(ToastContext);
  const getAllBids = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}bid/user`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      );
      const plotList = await response.json();
      if (response.status === 200) {
        setBids(plotList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBid = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}bid/${id}`,
        {
          method: "DELETE",
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      );
      const bid = await response.json();
      if (response.status === 200) {
        setToast(bid.message);
        getAllBids();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBids();
  }, []);
  return (
    <>
      <Layout1 title="My bids">
        <Grid container spacing={2}>
          {bids && bids.length > 0 ? (
            bids.map((bid) => (
              <Grid key={bid.id} item lg={4} md={6} width="100%">
                <BidCard
                  id={bid?.id}
                  name={bid?.plot.name}
                  description={bid?.plot.description}
                  amount={bid.amount}
                  deleteBid={deleteBid}
                />
              </Grid>
            ))
          ) : (
            <Typography>No bids found</Typography>
          )}
        </Grid>
      </Layout1>
    </>
  );
};

export default Bids;
