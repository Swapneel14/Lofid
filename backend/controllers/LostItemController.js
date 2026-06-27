// import LostItem from "../models/LostItem.js";

// export const getRecentLost = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const LostReports = await LostItem.find({ userId })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     return res.status(200).json({
//       success: true,
//       LostReports,
//     });
//   } catch (err) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// export const createLostItem = async (req, res) => {
//   try {
//     const {
//       userId,
//       itemName,
//       category,
//       images,
//       description,
//       lostDate,
//       lostTime,
//       lostLocation,
//     } = req.body;

//     if (
//       !userId ||
//       !itemName ||
//       !category ||
//       !description ||
//       !lostDate ||
//       !lostTime ||
//       !lostLocation
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be provided",
//       });
//     }

//     const lostItem = await LostItem.create({
//       userId,
//       itemName,
//       category,
//       images: images || [],
//       description,
//       lostDate,
//       lostTime,
//       lostLocation,
//     });

//     const populatedItem = await LostItem.findById(
//       lostItem._id
//     ).populate("userId");

//     console.log(
//       "User Name:",
//       populatedItem.userId
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Lost item reported successfully",
//       lostItem,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// export const getAllLostItems = async (req, res) => {
//   try {
//     const lostItems = await LostItem.find()
//       .populate("userId", "name email image")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       lostItems,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };



import LostItem from "../models/LostItem.js";
import cloudinary from "../config/cloudinary.js";

export const getRecentLost = async (req, res) => {
    try {
        const { userId } = req.params;

        const LostReports = await LostItem.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            LostReports,
        });
    } catch (err) {
        console.error(err); // Fixed typo: changed 'error' to 'err'

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    }
};

export const createLostItem = async (req, res) => {
    try {
        const {
            userId,
            itemName,
            category,
            description,
            lostDate,
            lostTime,
            lostLocation,
        } = req.body;

        // 1. Check for basic text fields
        if (
            !userId ||
            !itemName ||
            !category ||
            !description ||
            !lostDate ||
            !lostTime ||
            !lostLocation
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        // Optional: Validate images (Uncomment if you want to force at least 1 reference image)
        // if (!req.files || req.files.length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "At least 1 image is required",
        //     });
        // }

        // 2. Upload images to Cloudinary (if any were provided)
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        folder: "lostItems", // or "foundItems"
                        transformation: [
                            // 'limit' ensures the whole image is kept. It will size it down 
                            // to a max of 1200x1200px to save space, but NEVER crop or zoom.
                            { width: 1200, height: 1200, crop: "limit" },
                            { quality: "auto" }, // Automatically compresses file size
                            { fetch_format: "auto" } // Uses modern web formats (WebP/AVIF)
                        ]
                    }, (err, result) => {
                        err ? reject(err) : resolve({ url: result.secure_url, public_id: result.public_id });
                    }).end(file.buffer);
                });
            });
            imageUrls = await Promise.all(uploadPromises);
        }

        // 3. Create the document in MongoDB
        const lostItem = await LostItem.create({
            userId,
            itemName,
            category,
            images: imageUrls, // Store the array of objects here
            description,
            lostDate,
            lostTime,
            lostLocation,
        });

        // 4. Populate and return response
        const populatedItem = await LostItem.findById(lostItem._id).populate("userId");

        // console.log("User Data:", populatedItem.userId);

        return res.status(201).json({
            success: true,
            message: "Lost item reported successfully",
            lostItem: populatedItem, // Returning the populated item to match your foundItem logic
        });
    } catch (error) {
        console.error("Error in createLostItem:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const getAllLostItems = async (req, res) => {
    try {
        const { search } = req.query;

        let query = {};

        if (search) {
            query = {
                $or: [
                    {
                        itemName: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        category: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        lostLocation: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                ],
            };
        }

        const lostItems = await LostItem.find(query)
            .populate("userId", "name email image")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            lostItems,
        });
    } catch (error) {
        console.error("Error in getAllLostItems:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const deleteLostItem = async (req, res) => {
    try {
        const { id } = req.params;
        const lostItem = await LostItem.findById(id);

        if (!lostItem) {
            return res.status(404).json({
                success: false,
                message: "Lost item not found!",
            });
        }

        // Delete images from Cloudinary
        if (lostItem.images && lostItem.images.length > 0) {
            const deletePromises = lostItem.images.map((image) =>
                cloudinary.uploader.destroy(image.public_id)
            );

            await Promise.all(deletePromises);
        }

        // Delete document from MongoDB
        await LostItem.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Lost item deleted successfully!",
        });
    } catch (error) {
        console.error("Error deleting lost item: ", error);

        return res.status(500).json({
            success: false,
            message: "Server Error!",
            error: error.message,
        });
    }
};

export const updateLostItem = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            itemName,
            category,
            description,
            lostDate,
            lostTime,
            lostLocation,
        } = req.body;

        // Images that the user chose to keep
        const existingImages = JSON.parse(req.body.existingImages || "[]");

        const lostItem = await LostItem.findById(id);

        if (!lostItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        // Update text fields
        lostItem.itemName = itemName;
        lostItem.category = category;
        lostItem.description = description;
        lostItem.lostDate = lostDate;
        lostItem.lostTime = lostTime;
        lostItem.lostLocation = lostLocation;

        // Delete only those old images that the user removed
        for (const oldImage of lostItem.images) {
            const stillExists = existingImages.some(
                (img) => img.public_id === oldImage.public_id
            );

            if (!stillExists && oldImage.public_id) {
                await cloudinary.uploader.destroy(oldImage.public_id);
            }
        }

        // Upload newly selected images
        let uploadedImages = [];

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map((file) => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "lostItems",
                            transformation: [
                                { width: 1200, height: 1200, crop: "limit" },
                                { quality: "auto" },
                                { fetch_format: "auto" },
                            ],
                        },
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({
                                    url: result.secure_url,
                                    public_id: result.public_id,
                                });
                            }
                        }
                    ).end(file.buffer);
                });
            });

            uploadedImages = await Promise.all(uploadPromises);
        }

        // Combine kept old images with newly uploaded images
        lostItem.images = [
            ...existingImages,
            ...uploadedImages,
        ];

        await lostItem.save();

        const updatedItem = await LostItem.findById(id).populate("userId");

        return res.status(200).json({
            success: true,
            message: "Lost item updated successfully",
            lostItem: updatedItem,
        });
    } catch (error) {
        console.error("Error updating lost item:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const getLostItemById = async (req, res) => {
    try {
        const lostItem = await LostItem.findById(req.params.id);

        if (!lostItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        res.status(200).json({
            success: true,
            lostItem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};