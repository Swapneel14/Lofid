import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { banUser, getAllreports, ignoreUserReports , getBannedUsers , unbanUser, getUserById } from "../controllers/ReportController.js";

const router = express.Router();

router.get("/check", isAdmin, (req, res) => {
  res.json({ success:true,isAdmin: true });
});

router.get("/reports",isAdmin,getAllreports);
router.delete("/report/ignore", isAdmin, ignoreUserReports);
router.post("/report/ban", isAdmin, banUser);
router.get("/get-banned-users",isAdmin,getBannedUsers);
router.post("/unban-user",isAdmin,unbanUser);
router.get('/user/:id', isAdmin, getUserById);

export default router;