const express = require("express");


exports.dashboard=async(req,res)=>{
    

try {
    const dashboardData = {
      data: [
        { title: "Users", value: 120 },
        { title: "Orders", value: 75 },
        { title: "Revenue", value: "$5000" },
        { title: "Products", value: 40 },
        { title: "calls", value: 40 },
      ],

      COLORS: [
        "#379cef",
        "#f5c32f",
        "#7e57c2",
        "#5d4037",
        "#ec407a",
        "#26a69a",
        "#ffa726",
      ],

      datal: [
        { name: "Admin", value: 400 },
        { name: "David Robertson", value: 50 },
        { name: "Hubshare Service", value: 30 },
        { name: "Paul Marlborough", value: 20 },
        { name: "Daniel Cosby", value: 25 },
        { name: "Demo User", value: 500 },
        { name: "Jean-Michel Toussaint", value: 60 },
      ],

      dataa: [
        {
          month: "2019-08",
          Billing: 80,
          Correspondence: 5,
          Document: 3,
          Incoming: 2,
          Other: 4,
          Proposal: 1,
          Workpaper: 2,
          Contract: 3,
          Deliverable: 2,
          IncomingDoc: 60,
          KYC: 1,
          Permanent: 5,
          WorkInstruction: 4,
        },
        {
          month: "2021-03",
          Billing: 5,
          Correspondence: 2,
          Document: 1,
          Incoming: 1,
          Other: 2,
          Proposal: 1,
          Workpaper: 1,
          Contract: 2,
          Deliverable: 1,
          IncomingDoc: 3,
          KYC: 1,
          Permanent: 1,
          WorkInstruction: 1,
        },
      ],

      COLORSS: [
        "#42a5f5",
        "#ffca28",
        "#7e57c2",
        "#5d4037",
        "#26c6da",
        "#90caf9",
        "#ec407a",
        "#ef5350",
        "#26a69a",
        "#ffa726",
        "#66bb6a",
        "#ff8a65",
        "#1e88e5",
      ],

      keys: [
        "Billing",
        "Correspondence",
        "Document",
        "Incoming",
        "Other",
        "Proposal",
        "Workpaper",
        "Contract",
        "Deliverable",
        "IncomingDoc",
        "KYC",
        "Permanent",
        "WorkInstruction",
      ],
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};