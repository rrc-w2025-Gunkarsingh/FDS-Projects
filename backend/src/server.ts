import express from "express";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
const PORT = 5000;

// Allow requests from our React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Allow JSON data
app.use(express.json());

// Test backend connection
app.get("/api/health", (_req, res) => {
  res.json({
    message: "Study Planner backend is running!",
  });
});

// Course API routes
app.use("/api/courses", courseRoutes);

// Start backend server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});