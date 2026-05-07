import { useState, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Message() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState({});
  const bottomRef = useRef(null);

  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Mike" },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("messages"));
    if (data) setChat(data);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chat));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const newMsg = {
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    const updated = {
      ...chat,
      [selectedUser.id]: [...(chat[selectedUser.id] || []), newMsg],
    };

    setChat(updated);
    setMessage("");

    
    setTimeout(() => {
      const reply = {
        text: "Reply from " + selectedUser.name,
        sender: "other",
        time: new Date().toLocaleTimeString(),
      };

      setChat((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), reply],
      }));
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex", height: "90vh" }}>
      
      {/* LEFT: USERS */}
      <Box sx={{ width: "30%", borderRight: "1px solid #ddd" }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Messages
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
              <ListItemText primary={user.name} />
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
          {(chat[selectedUser?.id] || []).map((msg, i) => (
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
                  borderRadius: 2,
                }}
              >
                <Typography>{msg.text}</Typography>
                <Typography variant="caption">
                  {msg.time}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={bottomRef}></div>
        </Box>

        {/* Input */}
        {selectedUser && (
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}