import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { logout,increment,decrement,incrementamountpayload,reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ onMenuClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [value, setvalue] = useState();
  const dispatch = useDispatch();
 const state = useSelector((state) => state.auth.value);

  const handleincrement = () => {
    
    dispatch(increment());

  };
  const handledecrement = () => {
    dispatch(decrement());
  };
  const handleamountpayload = () => {
    dispatch(incrementamountpayload(value));
  };
  // const handlereset = () => {
  //   dispatch(reset());
  // };

  useEffect(() => {
    const updateAuth = () => {
      const status = localStorage.getItem("isLoggedIn") === "true";
      const userData = JSON.parse(localStorage.getItem("user"));

      setIsLoggedIn(status);
      setUser(userData);
    };

    updateAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    dispatch(logout());
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">Dashboard</Typography>
        </Box>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {/* <TextField label="enter value"  value ={state} variant="outlined" onChange={(e) => setvalue(e.target.value)}/> */}
          {state}
           <Button color="inherit" onClick={handleincrement} >
            increment
          </Button>
           <Button color="inherit" onClick={handledecrement}>
            decrement
          </Button>
          <Button color="inherit" onClick={handleamountpayload}>
            count
          </Button>

          <Button color="inherit" onClick={() => dispatch(reset())}>
            reset
          </Button>
        <TextField label="enter value" type="number" onChange= {(e) => setvalue(e.target.value)} variant="outlined" />


          {isLoggedIn && user ? (
            <Typography component="span" sx={{ mx: 2, fontWeight: "bold" }}>
              {user.name}
            </Typography>
          ) : (
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          )}
          {/* {<Typography></Typography>} */}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
