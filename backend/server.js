import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from "./inngest/index.js";
import {serve} from 'inngest/express';

const app = express();
const port = 6769;

connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/inngest', serve({ client: inngest, functions }))
app.use(clerkMiddleware())

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
