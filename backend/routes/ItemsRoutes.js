import express from "express";
import { createLostItem, getRecentLost } from "../controllers/LostItemController.js";
import { createFoundItem, getFoundItems } from "../controllers/FoundItemController.js";

const router = express.Router();

//Lost-Item Routes
router.post("/create-lost-item", createLostItem);
router.get('/get-recent-lost/:userId',getRecentLost);

//Found-Item Routes
router.post("/create-found-item", createFoundItem);
router.get("/get-recent-found/:userId",getFoundItems);




export default router;