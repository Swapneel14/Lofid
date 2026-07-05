import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { banUser, getAllreports, ignoreReport } from "../controllers/ReportController.js";

const router = express.Router();

router.get("/check", isAdmin, (req, res) => {
  res.json({ success:true,isAdmin: true });
});

router.get("/reports",isAdmin,getAllreports);
router.delete("/report/ignore", isAdmin, ignoreReport);
router.delete("/report/ban", isAdmin, banUser);

export default router;