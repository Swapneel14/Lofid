import { getAuth } from "@clerk/express";
import Report from "../models/Report.js";

export const createReport = async (req, res) => {
    try {

        const {userId} = getAuth(req);
        const auth = getAuth(req);

        console.log(auth);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { reportedUserId, messageContent } = req.body;

        const alreadyReported = await Report.findOne({
            reporterUserId: userId,
            reportedUserId,
            messageContent,
        });

        if (alreadyReported) {
            return res.status(400).json({
                message: "Already reported.",
            });
        }

        const report = await Report.create({
            reporterUserId:userId,
            reportedUserId,
            messageContent
        })

        res.status(201).json({
      success: true,
      report,
    });

    } catch (e) {
        console.log(e);
        res.status(500).json({
      message: "Server Error",
    });
    }
}