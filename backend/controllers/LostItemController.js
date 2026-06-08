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
        const lostItems = await LostItem.find()
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