import { getAuth } from "@clerk/express";
import Report from "../models/Report.js";
import BannedUser from "../models/Banneduser.js";

export const createReport = async (req, res) => {
    try {

        const { userId } = getAuth(req);
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
            reporterUserId: userId,
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

//Get All reports
export const getAllreports = async (req, res) => {
    try {

        const reports = await Report.find();

        res.json({
            success: true,
            reports
        })

    } catch (e) {
        res.status(500).json({
            messsage: "Internal Server Error"
        })
    }
}

//Ignore a Report
export const ignoreReport = async (req, res) => {
    try {

        await Report.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Report Ignored and Deleted"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

//Ban a User
export const banUser = async (req, res) => {
    try {
        const report = await Report.findById(req.body.id);

        if (!report) {
            return  res.status(404).json({
                message: " Report Not Found"
            })
        }

        const alreadyBanned = await BannedUser.findOne({
            userId: report.reportedUserId
        });

        const expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + 3);

        if (!alreadyBanned) {
            await BannedUser.create({
                userId: report.reportedUserId,
                expiredAt,
            })
        }

        await Report.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "User banned successfully.",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
