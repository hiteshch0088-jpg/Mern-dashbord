import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Avatar,Button } from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart
} from "recharts";
import axios from "axios";
import api from "../api.js";

export default function CardRow({ open }) {
  const drawerWidth = 240;

   const [data, setData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [colors, setColors] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [keys, setKeys] = useState([]);
    const [image, setImage] = useState("");


  
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await axios.get("https://mern-dashboard-api.onrender.com/api/dashboard/");

     setData(res.data.data || []);
        setPieData(res.data.datal || []);
        setBarData(res.data.dataa || []);
        setColors(res.data.COLORS || []);
        setBarColors(res.data.COLORSS || []);
        setKeys(res.data.keys || []);
        setSalesData([
          { day: "Mon", sales: 200 },
          { day: "Tue", sales: 400 },
          { day: "Wed", sales: 300 },
          { day: "Thu", sales: 500 },
          { day: "Fri", sales: 700 },
        ]);

    } catch (err) {
      console.error(err);
    }
  };

  fetchDashboard();
}, []);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.profile) {
    setImage(user.profile);
  }
}, []);


const handleUpload = async (e) => {
  try {
    const file = e.target.files[0];
    if (!file) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id || storedUser?.id;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    const res = await axios.post("https://mern-dashboard-api.onrender.com/api/profile/upload",
      formData
    );

    setImage(res.data.image);

    localStorage.setItem("user", JSON.stringify(res.data.user));

  } catch (err) {
    console.error("Error uploading image",err);
  }
};
const handleEdit = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    handleUpload(e); 
  };

  input.click();
};
  return (
    <Box sx={{display:"flex",gap:5,}}>
      <Box>
      
      <Grid container spacing={6} sx={{ mt: 10 }}>
  {data?.length > 0 ? (
    data.map((item, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card
          sx={{
            textAlign: "center",
            p: 2,
            backgroundColor: "#f5f5f5",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="h6">
              {item?.title || "N/A"}
            </Typography>

            <Typography variant="h4">
              {item?.value || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Typography align="center">No Data Found</Typography>
    </Grid>
  )}
</Grid>
     <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    gap: 3,
  }}
>
      <Card
  sx={{
    mt: 7,
    p: 2,
    backgroundColor: "#e0e0e0",
    width: { xs: "100%", sm: 300 }, 
    height: "auto", 
  }}
>
  <CardContent>
    <Typography variant="h6">Sales per Day</Typography>

   
    <Box sx={{ mt: 4, width: "100%", height: 180 }}>
      <ResponsiveContainer sx={{ width:"100%", height:"100%"}}>
        <LineChart data={salesData || []}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>
    </Box>

  
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={6}>
        <Typography variant="body2">Total Revenue</Typography>
        <Typography variant="h6">$4512</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body2">Today Sales</Typography>
        <Typography variant="h6">$345</Typography>
      </Grid>
    </Grid>
  </CardContent>
</Card>

 <Card sx={{ width: 400, p: 2,mt: 7, backgroundColor: "#e0e0e0" }}>
      <CardContent>
        
      
        <Typography variant="body2" color="text.secondary">
          Item Count: <strong>202</strong>
        </Typography>

       
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 1, mb: 2 }}
          >
          Document creator
        </Typography>

        {/* Donut Chart */}
        <Box sx={{ width: "100%", height: 260}}>
          <ResponsiveContainer>
            <PieChart>
              <Pie 
                data={pieData}
                innerRadius={70}   
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={index}
                    
                    fill={colors[index % colors.length] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

      </CardContent>
    </Card>
    </Box>
      
    <Card
  sx={{
    width: "100%",
    maxWidth: 720,
    p: 2,
    mt: 5,
    backgroundColor: "#e0e0e0",
  }}
>
  <CardContent>
    <Typography variant="body2">
      Item Count: <strong>{barData?.length || 0}</strong>
    </Typography>

    <Typography variant="h6" align="center" sx={{ mb: 2 }}>
      Document Types and Creation Date
    </Typography>

    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer sx={{width:"100%", height:"100%"}}>
        <BarChart data={barData || []}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {keys?.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={
                barColors[index % barColors.length] || "#1976d2"
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </CardContent>
</Card>
  </Box>
<Box> 
   <Card
  sx={{
    width: { xs: "100%", md: 350 }, // ✅ responsive
    mt: 10,
    borderRadius: 3,
    overflow: "hidden",
    color: "#fff",
    background: "linear-gradient(180deg, #5f2c82, #49a09d)",
  }}
>
  <Box sx={{ textAlign: "center", p: 3 }}>
    <Box sx={{ position: "relative", display: "inline-block" }}>
      
      
      <div style={{ textAlign: "center" }}>
      
      <Avatar
        src={image ? `https://mern-dashboard-api.onrender.com/uploads/${image}` : ""}
        sx={{ width: 100, height: 100, margin: "auto" }}
      />

      <br />

      <Button variant="contained" component="label">
        Add profile
        <input type="file" hidden onChange={handleUpload} />
      </Button><br/>
      <Button sx={{mt:1}} variant="contained" component="label">
        Edit profile
        <input type="file" hidden onChange={handleEdit} />
      </Button>
    </div>


      
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 5,
          width: 15,
          height: 15,
          bgcolor: "#00e676",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />
    </Box>

    <Typography variant="h6" sx={{ mt: 2 }}>
      i am happy
    </Typography>
  </Box>

  <Grid
    container
    spacing={2} 
    sx={{
      textAlign: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
      py: 3,
    }}
  >
    <Grid item xs={4}>
      <Typography variant="body2">Earning</Typography>
      <Typography variant="h6" sx={{ color: "#00e676" }}>
        $2314
      </Typography>
      <Typography variant="caption">lorem ipsum</Typography>
    </Grid>

    <Grid item xs={4}>
      <Typography variant="body2">Bonus</Typography>
      <Typography variant="h6" sx={{ color: "#00e676" }}>
        $200
      </Typography>1
      <Typography variant="caption">lorem ipsum</Typography>
    </Grid>

    <Grid item xs={4}>
      <Typography variant="body2">Favorite</Typography>
      <Typography variant="h6" sx={{ color: "#00e676" }}>
        12,340
      </Typography>
      <Typography variant="caption">lorem ipsum</Typography>
    </Grid>
  </Grid>

  <CardContent>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Overall Stats
    </Typography>

    {[
      { name: "Service 01", value: 80 },
      { name: "Service 02", value: 70 },
      { name: "Service 03", value: 20 },
      { name: "Service 04", value: 10 },
      { name: "Service 05", value: 90 },
    ].map((item, index) => (
      <Box key={index} sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {item.name}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={item.value}
          sx={{
            height: 6,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.2)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#00e676",
            },
          }}
        />
      </Box>
    ))}
  </CardContent>
</Card> </Box>
    
    </Box>
  );
}
