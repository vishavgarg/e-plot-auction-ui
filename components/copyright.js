import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        e-Plot Auction
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
