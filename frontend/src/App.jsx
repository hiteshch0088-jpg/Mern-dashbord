import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";
import Chat from "./pages/Chat";
import Inbox from "./pages/Inbox";
import Setting from "./pages/Setting";
import Message from "./pages/Message";
import Account from "./pages/Account";
import Team from "./pages/Team";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Inbox" element={<Inbox />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Acount" element={<Account />} />
          <Route path="/Team" element={<Team />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
