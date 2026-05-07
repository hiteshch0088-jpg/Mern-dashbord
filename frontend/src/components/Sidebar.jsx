import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from '@mui/icons-material/Chat';
import InboxIcon from '@mui/icons-material/Inbox';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;   

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Users", icon: <DashboardIcon />, path: "/Users" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { text: "Product", icon: <PeopleIcon />, path: "/Product" },
    { text: "chat", icon: <ChatIcon />, path: "/Chat" },
    { text: "inbox", icon: <InboxIcon />, path: "/Inbox" },
    { text: "Team", icon: <PeopleIcon />, path: "/Team" },
    { text: "message", icon: <MessageIcon />, path: "/Message" },
    { text: "Acount", icon: <AccountCircleIcon />, path: "/Acount" },
    { text: "setting", icon: <SettingsIcon />, path: "/Setting" },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="temporary" 
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              navigate(item.path);
              onClose(); 
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            </ListItem>
        ))}
      </List>
    </Drawer>
  );
}