require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");

const app = express();   // 👈 YAHAN app create hota hai

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/fordspace")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// ROUTES
app.use("/api", authRoutes);
app.use("/api/team", teamRoutes);


app.listen(5000,()=>{
  console.log("Server running on port 5000");
});