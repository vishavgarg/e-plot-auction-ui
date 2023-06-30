import MakeBid from "@/components/makeBid";
import { ToastContext } from "@/context/toast";
import Layout1 from "@/layout/layout1";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PlotDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setToast } = React.useContext(ToastContext);
  const [plotDetails, setPlotDetails] = useState();
  const [biddingAmount, setBiddingAmount] = React.useState();
  const getPlotDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}plot/${id}`
      );
      const plot = await response.json();
      if (response.status === 200) {
        setPlotDetails(plot);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makeBid = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}bid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            plotId: id,
            amount: biddingAmount,
          }),
        }
      );
      const bid = await response.json();
      setToast(bid.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    id && getPlotDetails();
  }, [id]);
  return (
    <>
      <Layout1 title="Make bid">
        <MakeBid
          name={plotDetails?.name}
          description={plotDetails?.description}
          startingBid={plotDetails?.startingBid}
          makeBid={makeBid}
          biddingAmount={biddingAmount}
          setBiddingAmount={setBiddingAmount}
        />
      </Layout1>
    </>
  );
};

export default PlotDetails;
