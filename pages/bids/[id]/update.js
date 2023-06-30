import MakeBid from "@/components/makeBid";
import { ToastContext } from "@/context/toast";
import Layout1 from "@/layout/layout1";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const UpdateBid = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setToast } = useContext(ToastContext);
  const [bidDetails, setBidDetails] = useState();
  const [biddingAmount, setBiddingAmount] = useState();
  const getBidDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}bid/details/${id}`
      );
      const details = await response.json();
      if (response.status === 200) {
        setBidDetails(details);
        setBiddingAmount(details.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateBid = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}bid/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
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
    id && getBidDetails();
  }, [id]);
  return (
    <>
      <Layout1 title="Update bid">
        <MakeBid
          name={bidDetails?.plot.name}
          description={bidDetails?.plot.description}
          startingBid={bidDetails?.plot.startingBid}
          makeBid={updateBid}
          biddingAmount={biddingAmount}
          setBiddingAmount={setBiddingAmount}
        />
      </Layout1>
    </>
  );
};

export default UpdateBid;
