import PlotCard from "@/components/plotCard";
import Layout1 from "@/layout/layout1";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const [plots, setPlots] = useState([]);
  const getAllPlots = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}plot`
      );
      const plotList = await response.json();
      if (response.status === 200) {
        setPlots(plotList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlots();
  }, []);
  return (
    <>
      <Layout1 title="Plots">
        <Box display="flex" justifyContent="end">
          <Link href="/create-plot"><Button variant="outlined">Create Plot</Button></Link>
        </Box>
        <Grid container spacing={2} mt={2}>
          {plots && plots.length > 0 ? (
            plots.map((plot) => (
              <Grid key={plot.id} item lg={4} md={6} width="100%">
                <PlotCard
                  id={plot.id}
                  name={plot.name}
                  description={plot.description}
                  startingBid={plot.startingBid}
                  resultDate={plot.resultDate}
                />
              </Grid>
            ))
          ) : (
            <Typography>No plots found</Typography>
          )}
        </Grid>
      </Layout1>
    </>
  );
};

export default Dashboard;
