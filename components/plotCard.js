import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Countdown from 'react-countdown';

export default function PlotCard({ id, name, description, startingBid, resultDate }) {
  const router = useRouter();
  const navigateToBid = () => {
    router.push("/bids/" + id);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Plot
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">Minimum Bid: $ {startingBid}</Typography>
        <Typography color="text.secondary">
        Ends in - <Countdown date={new Date(resultDate)} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateToBid}>
          Bid
        </Button>
      </CardActions>
    </Card>
  );
}
