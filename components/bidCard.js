import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default function BidCard({ id, name, description, amount, deleteBid }) {
  const router = useRouter();
  const navigateToBid = () => {
    router.push("/bids/" + id + "/update");
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Plot
          </Typography>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteBid(id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">Bid Amount: $ {amount}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={navigateToBid}>
          Update Bid
        </Button>
      </CardActions>
    </Card>
  );
}
