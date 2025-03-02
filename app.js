require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const userRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const dbConnection = require("./db/dbConfig");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const answerRoutes = require("./routes/answerRoute");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes with /api prefix
app.use("/api/questions", authMiddleware, questionsRoutes);
app.use("/api/answers", authMiddleware, answerRoutes);
app.use("/api/users", userRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is healthy" });
});

// Start server and connect to database
async function start() {
  try {
    // Test database connection
    const [result] = await dbConnection.execute("SELECT 1");
    console.log("Database connected successfully!");

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`API endpoints ready at http://localhost:${port}/api`);
    });
  } catch (error) {
    console.log("Database connection error:", error.stack);
    process.exit(1);
  }
}

start();
