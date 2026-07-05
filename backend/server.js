import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./inngest/index.js";
import {serve} from 'inngest/express';
import router from "./routes/ItemsRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import reportRouter from "./routes/ReportRoutes.js";
import authRouter from "./routes/RegisterRoute.js";
import dns from 'dns';

dns.setServers(["1.1.1.1","0.0.0.0"]);

const app = express();
const port = 6769;



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
app.use("/api/admin", adminRouter);
app.use("/api/report", reportRouter);
app.use("/api/auth", authRouter);


app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);



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