import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("team"));
    if (data) setMembers(data);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(members));
  }, [members]);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) return;

    if (editId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editId ? { ...form, id: editId } : m))
      );
      setEditId(null);
    } else {
      const newMember = { ...form, id: Date.now() };
      setMembers((prev) => [...prev, newMember]);
    }

    setForm({ name: "", email: "", role: "" });
    setOpen(false);
  };

  
  const handleEdit = (member) => {
    setForm(member);
    setEditId(member.id);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  
  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Team Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Member
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(m)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(m.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Member" : "Add Member"}</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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