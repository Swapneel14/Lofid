import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/check", isAdmin, (req, res) => {
  res.json({ success:true,isAdmin: true });
});

export default router;