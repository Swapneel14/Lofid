import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./inngest/index.js";
import {serve} from 'inngest/express';
import router from "./routes/ItemsRoutes.js";

const app = express();
const port = 6769;

await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.get("/test", (req, res) => {
  res.send("test route works");
});


app.use("/api/item", router);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.use("/api/lost-item", lostRouter);

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();