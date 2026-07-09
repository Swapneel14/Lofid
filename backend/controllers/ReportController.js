import { getAuth } from "@clerk/express";
import Report from "../models/Report.js";
import BannedUser from "../models/Banneduser.js";
import User from "../models/User.js";

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
export const ignoreUserReports = async (req, res) => {
    try {
        const { reportedUserId } = req.body;

        if (!reportedUserId) {
            return res.status(400).json({ message: "reportedUserId is required" });
        }

        // Delete ALL reports where this user is the reported person
        await Report.deleteMany({ reportedUserId });

        res.json({
            success: true,
            message: "All reports for this user have been ignored and deleted."
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const banUser = async (req, res) => {
    try {
        const { reportedUserId } = req.body;

        if (!reportedUserId) {
            return res.status(400).json({ message: "reportedUserId is required" });
        }

        const alreadyBanned = await BannedUser.findOne({ userId: reportedUserId });

        // If they aren't banned yet, ban them for 3 days
        if (!alreadyBanned) {
            const expiredAt = new Date();
            expiredAt.setDate(expiredAt.getDate() + 3);

            await BannedUser.create({
                userId: reportedUserId,
                expiredAt,
            });
        }

        // Clean up the reports table since the user is now dealt with
        await Report.deleteMany({ reportedUserId });

        res.json({
            success: true,
            message: "User banned successfully and reports cleared.",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//get all banned user
export const getBannedUsers = async (req, res) => {
    try {
        const bannedUsers = await BannedUser.find();

        res.json({
            success: true,
            bannedUsers
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Unban a User
export const unbanUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        await BannedUser.findOneAndDelete({ userId });

        res.json({
            success: true,
            message: "User unbanned successfully."
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


function formatUserName(rawName) {
    if (!rawName) return "Unknown User";

    // 1. Split the string into words
    let parts = rawName.trim().split(" ");

    // 2. If the first word contains a number (like an ID/Roll No), remove it
    if (/\d/.test(parts[0])) {
        parts.shift(); 
    }

    // 3. Join the remaining parts and replace underscores with spaces
    let cleanName = parts.join(" ").replace(/_/g, " ");

    // 4. Convert to Title Case (e.g., SWAPNEEL SARKAR -> Swapneel Sarkar)
    cleanName = cleanName
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    return cleanName;
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return only the necessary non-sensitive data
        res.status(200).json({ 
            user: { 
                id: user._id, 
                name: formatUserName(user.name), 
                email: user.email 
            } 
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: "Server Error" });
    }
};