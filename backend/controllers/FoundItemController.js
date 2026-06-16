import FoundItem from "../models/FoundItem.js";

import cloudinary from "../config/cloudinary.js";

export const createFoundItem = async (req, res) => {
    try {
        const {
            userId,
            itemName,
            category,
            description,
            LocationFound,
        } = req.body;

        // 1. Check for basic text fields
        if (!userId || !itemName || !category || !description || !LocationFound) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        // 2. Validate images (ensure files exist)
        if (!req.files || req.files.length < 3) {
            return res.status(400).json({
                success: false,
                message: "At least 3 images are required",
            });
        }

        // 3. Upload images to Cloudinary
        // const imageUrls = [];

        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ 
                folder: "foundItems", // or "foundItems"
                transformation: [
                    // 'limit' ensures the whole image is kept. It will size it down 
                    // to a max of 1200x1200px to save space, but NEVER crop or zoom.
                    { width: 1200, height: 1200, crop: "limit" },
                    { quality: "auto" }, // Automatically compresses file size
                    { fetch_format: "auto" } // Uses modern web formats (WebP/AVIF)
                ]
            }, (err, res) => {
                    err ? reject(err) : resolve({ url: res.secure_url, public_id: res.public_id });
                }).end(file.buffer);
            });
        });
        const imageUrls = await Promise.all(uploadPromises);

        // 4. Create the document in MongoDB
        const foundItem = await FoundItem.create({
            userId,
            itemName,
            category,
            images: imageUrls, // Store the array of objects here
            description,
            LocationFound,
        });

        // 5. Populate and return response
        const populatedItem = await FoundItem.findById(foundItem._id).populate("userId");

        return res.status(201).json({
            success: true,
            message: "Found item reported successfully",
            foundItem: populatedItem,
        });
    } catch (error) {
        console.error("Error in createFoundItem:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};


export const getFoundItems = async (req, res) => {
    try {

        const { userId } = req.params;

        const foundReports = await FoundItem.find({ userId }).sort({ createdAt: -1 }).limit(5);

        return res.status(200).json({
            success: true,
            FoundReports: foundReports,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

export const getAllFoundItems = async (req, res) => {
    // console.log("running getAllFoundItem api");
    try {
        const foundItems = await FoundItem.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch found items",
            error: error.message,
        });
    }
}


