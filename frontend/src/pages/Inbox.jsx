import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Inbox() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const users = [
    { id: 1, name: "John", lastMsg: "Hello!" },
    { id: 2, name: "Sara", lastMsg: "How are you?" },
    { id: 3, name: "Mike", lastMsg: "Let's meet" },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <Box sx={{ display: "flex", height: "90vh" }}>
      
      
      <Box sx={{ width: "30%", borderRight: "1px solid #ddd" }}>
        <Typography sx={{ p: 2 }} variant="h6">
          Inbox
        </Typography>
        <Divider />

        <List>
          {users.map((user) => (
            <ListItem
              button
              key={user.id}
              onClick={() => setSelectedUser(user)}
            >
              <Avatar sx={{ mr: 2 }}>{user.name[0]}</Avatar>
              <ListItemText
                primary={user.name}
                secondary={user.lastMsg}
              />
            </ListItem>
          ))}
        </List>
      </Box>

     
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        
        <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
          <Typography variant="h6">
            {selectedUser ? selectedUser.name : "Select User"}
          </Typography>
        </Box>

   
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "me" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  maxWidth: "60%",
                  bgcolor:
                    msg.sender === "me" ? "#25D366" : "#f1f1f1",
                  color: msg.sender === "me" ? "#fff" : "#000",
                }}
              >
                <Typography>{msg.text}</Typography>
                <Typography variant="caption">
                  {msg.time}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        
        {selectedUser && (
          <Box sx={{ display: "flex", p: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}