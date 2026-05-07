import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Mainn from "../components/mainnn";
// import CardRow from "../components/CardR";
import { Box } from "@mui/material";

const drawerWidth = 240;

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box
        sx={{
          ml: open ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
          p: 2,
        }}
      >
        <Mainn />
      </Box>
    </Box>
  );
};

export default Home;