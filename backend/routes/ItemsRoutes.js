import express from "express";
import { createLostItem, getAllLostItems, getRecentLost } from "../controllers/LostItemController.js";
import { createFoundItem, getAllFoundItems, getFoundItems } from "../controllers/FoundItemController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//Lost-Item Routes
router.post("/create-lost-item",
    upload.array("images", 10),
    createLostItem);
    
router.get('/get-recent-lost/:userId', getRecentLost);
router.get('/all-lost-items',getAllLostItems);

//Found-Item Routes
router.post("/create-found-item",
    upload.array("images", 10),
    createFoundItem);

router.get("/get-recent-found/:userId", getFoundItems);

router.get("/get-all-found-items", getAllFoundItems);




export default router;