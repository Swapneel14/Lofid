import express from "express";
import { createLostItem } from "../controllers/LostItemController.js";
import { createFoundItem } from "../controllers/FoundItemController.js";

const router = express.Router();

router.post("/create-lost-item", createLostItem);
router.post("/create-found-item", createFoundItem);

export default router;