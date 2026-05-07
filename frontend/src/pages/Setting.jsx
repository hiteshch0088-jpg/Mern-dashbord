import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Settings() {
  const [tab, setTab] = useState(0);

  // USERS
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // APP SETTINGS
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
  });

  // LOAD DATA
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("settings-users"));
    const savedSettings = JSON.parse(localStorage.getItem("app-settings"));

    if (savedUsers) setUsers(savedUsers);
    if (savedSettings) setSettings(savedSettings);
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("settings-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("app-settings", JSON.stringify(settings));
  }, [settings]);

  // HANDLE FORM
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE USER
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editId ? { ...form, id: editId } : u))
      );
      setEditId(null);
    } else {
      setUsers((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", email: "", role: "" });
    setOpen(false);
  };

  // EDIT
  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
    setOpen(true);
  };

  // DELETE
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Settings
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Users" />
        <Tab label="App Settings" />
      </Tabs>

      {/* USERS TAB */}
      {tab === 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add User
          </Button>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(u)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(u.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      
      {tab === 1 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={(e) =>
                  setSettings({ ...settings, darkMode: e.target.checked })
                }
              />
            }
            label=
           { settings.darkMode ? "Light Mode" : "Dark Mode"} 
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: e.target.checked,
                  })
                }
              />
            }
            label={settings.notifications ? " disable Notifications" : "Enable Notifications"}
          />
        </Paper>
      )}

      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit User" : "Add User"}</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}