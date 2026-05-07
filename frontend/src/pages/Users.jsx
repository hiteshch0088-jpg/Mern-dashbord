import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { authStart,authFail,user } from "../features/authSlice";

const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();


  const state = useSelector((state) => state.auth);
  
 
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ll/api/users");
      dispatch(user(res.data));
      // console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || "Signup failed"));
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ ADD USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/ll/api/users", {
        name,
        email,
      });
      dispatch(user(...users, res.data));
      // console.log(res.data);

      setUsers([...users, res.data]);
      setName("");
      setEmail("");
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || "Signup failed"));
      console.log(err);
    }
  };

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ll/api/users/${id}`);

      dispatch(user(users.filter((u) => u._id !== id)));
      // console.log(users.filter((u) => u._id !== id));

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      dispatch(authFail(err.response?.data?.message || "Delete failed"));
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      
      {/* FORM */}
      <Card sx={{ width: 400, margin: "auto", mt: 5 }}>
        <CardContent>
          <Typography variant="h5">Users</Typography>

          <TextField
            fullWidth
            label="Name"
            sx={{ mt: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            sx={{ mt: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Table sx={{ width: 700, margin: "auto", mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Users;