import express from "express";
import { createLostItem } from "../controllers/LostItemController.js";

const lostRouter = express.Router();

lostRouter.post("/create-lost-item", createLostItem);

export default lostRouter;