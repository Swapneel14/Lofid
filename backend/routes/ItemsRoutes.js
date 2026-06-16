import express from "express";
import { createLostItem, deleteLostItem, getAllLostItems, getRecentLost } from "../controllers/LostItemController.js";
import { createFoundItem, getAllFoundItems, getFoundItems } from "../controllers/FoundItemController.js";
import upload from "../middleware/upload.js";
import { getUserItems } from "../controllers/AllItemsController.js";

const router = express.Router();

//Lost-Item Routes
router.post("/create-lost-item",
    upload.array("images", 10),
    createLostItem);
    
router.get('/get-recent-lost/:userId', getRecentLost);
router.get('/all-lost-items',getAllLostItems);
router.delete("/delete-lost-item/:id", deleteLostItem);

//Found-Item Routes
router.post("/create-found-item",
    upload.array("images", 10),
    createFoundItem);

router.get("/get-recent-found/:userId", getFoundItems);

router.get("/get-all-found-items", getAllFoundItems);


//All items Routes
router.get("/get-all-items/:userId",getUserItems);

export default router;