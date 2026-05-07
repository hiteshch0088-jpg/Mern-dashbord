import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authStart, loginSuccess, authFail } from "../features/authSlice";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);


  const handlelogin = async () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Invalid email format");
      return;
    }
    try {
      dispatch(authStart());
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isLoggedIn", true);

      
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      setemail("");
      setpassword("");
      navigate("/");
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || "Login failed"));
    }
  };
  const forgotpassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      alert("send link in your mail");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP ");
    }
  };


  const handleGoogleLogin = async () => {
  try {

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(
      auth,
      provider
    );

    const token = await result.user.getIdToken();

    const response = await axios.post(
      "http://localhost:5000/api/auth/google-login",
      {
        token,
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", true);

    console.log(response.data);

    alert("Login Successful");

    navigate("/");

  } catch (error) {

    console.log(error.response?.data);

    console.log(error.response?.data?.message);

    console.log(error);

  }
};
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Card sx={{ width: "370px",mt: 4, p: 2, boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
      }}>
        <CardContent sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <Typography>Login</Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button variant="contained" onClick={handlelogin}>
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={forgotpassword}
          >
            Forgot Password?
          </Typography>
        

          <Button startIcon={<GoogleIcon />} sx={{color:"black",backgroundColor:"yellow"}} onClick={handleGoogleLogin}>
        Login with Google

          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
