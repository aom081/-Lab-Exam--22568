const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Root
app.get("/", (req, res) => {
  res.send("SE NPRU TaskFlow Mini API is running");
});

// Connect to MongoDB & Start Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("MongoDB Connection Error: ", error.message));
