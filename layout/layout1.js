import Sidebar from "@/components/sidebar";
import { Box } from "@mui/material";
import React from "react";

const drawerWidth = 240;
const Layout1 = ({ children, title }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar title={title} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "70px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout1;
