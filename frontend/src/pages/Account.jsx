import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function Account() {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [form, setForm] = useState(user);

  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("account"));
    if (data) {
      setUser(data);
      setForm(data);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("account", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Avatar upload
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = () => {
    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    setUser(form);
    setEdit(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Account Profile
        </Typography>

        {/* Avatar */}
        <Stack alignItems="center" spacing={1} mb={2}>
          <Avatar
            src={form.avatar}
            sx={{ width: 80, height: 80 }}
          />
          {edit && (
            <Button variant="outlined" component="label">
              Upload
              <input hidden type="file" onChange={handleAvatar} />
            </Button>
          )}
        </Stack>

        {/* Form */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!edit}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={!edit}
          sx={{ mb: 2 }}
        />

        {edit && (
          <TextField
            fullWidth
            label="New Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        )}

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {edit ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          )}

          {edit && (
            <Button color="error" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}