import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    product: "",
    amount: "",
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/aa/orders");
      // console.log("API RESPONSE:", res.data);
          // console.log(res.data);

      setOrders(res.data);
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.product || !form.amount) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bb/orders", form);
      fetchOrders();
      setForm({ name: "", product: "", amount: "" });

    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {

    console.log("DELETE CLICKED:", id); 
    try {
      await axios.delete(`http://localhost:5000/api/cc/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Create Order
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Product"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Add Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Orders List
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((item) => ( 
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>₹{item.amount}</TableCell>
                  <TableCell>
                    {/* {item.action} */}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Orders;
