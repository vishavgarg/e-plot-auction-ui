import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";

export default function MakeBid({
  name,
  description,
  startingBid,
  biddingAmount,
  setBiddingAmount,
  makeBid,
}) {
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
      </CardContent>
      <CardActions>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            type="number"
            value={biddingAmount}
            onChange={(e) => setBiddingAmount(e.target.value)}
          />
        </FormControl>
        <Button size="small" onClick={makeBid}>
          Bid
        </Button>
      </CardActions>
    </Card>
  );
}
