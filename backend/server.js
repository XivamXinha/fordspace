require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Debug check
if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI missing in ENV");
}

// ✅ MongoDB Connection (FINAL FIXED)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/team", teamRoutes);

// ✅ Default route (optional but useful)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// ✅ Dynamic PORT (Render ke liye important)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});