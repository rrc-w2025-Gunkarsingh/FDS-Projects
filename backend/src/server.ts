
import express from "express";
import cors from "cors";

import courseRoutes from "./routes/courseRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "Study Planner backend is running!",
  });
});

// Course API routes
app.use("/api/courses", courseRoutes);

// Study Goals API routes
app.use("/api/goals", goalRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
