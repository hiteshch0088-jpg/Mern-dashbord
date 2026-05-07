import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupSuccess, authFail } from "../features/authSlice";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (name === "" || email === "" || password === "") {
      alert("Please fill in all fields ");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Invalid email format");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password: password,
      });

      dispatch(signupSuccess(res.data.newUser));
      alert("Signup successful ");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (err) {
      console.log(err);
      dispatch(authFail(err.response?.data?.message || "Signup failed"));

      alert("Signup failed");
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 350, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            {" "}
            Signup{" "}
          </Typography>

          <TextField
            required
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <TextField
            required
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          {/* <TextField
            required
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          /> */}


           <TextField
      required
      label="Password"
      type={showPassword ? "text" : "password"}
      fullWidth
      margin="normal"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="new-password"
      InputProps={{
        endAdornment: (
          <InputAdornment  position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
              {/* <Visibility /> */}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignup}
          >
            {" "}
            Signup{" "}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
