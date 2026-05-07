import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mui-chat"));
    if (saved) setMessages(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("mui-chat", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");

    
    setTimeout(() => {
      const reply = {
        text: "Hello 👋",
        sender: "other",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        width: 350,
        mx: "auto",
        mt: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: 500,
      }}
    >
      
      <Box sx={{ p: 2, bgcolor: "#25D366", color: "#fff" }}>
        <Typography variant="h6">Chat</Typography>
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
                maxWidth: "70%",
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
    </Box>
  );
}