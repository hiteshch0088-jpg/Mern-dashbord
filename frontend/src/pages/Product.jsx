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

const Product = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });


  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/tt/aaa/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tt/ccc/products/${id}`);
    fetchProducts();
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name & Price required");
      return;
    }

    await axios.post("http://localhost:5000/tt/bbb/products", form);
    fetchProducts();

    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔥 FORM */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Product List
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell> 
                    <Button variant="contained" color="error" onClick={() => handleDelete(p._id)}>
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

export default Product;