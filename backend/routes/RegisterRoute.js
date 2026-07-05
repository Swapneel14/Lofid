import express from "express";
import { checkBan } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/check-ban", checkBan);

export default router;