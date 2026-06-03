import FoundItem from "../models/FoundItem.js";

export const createFoundItem = async (req, res) => {
    try {
        const {
            userId,
            itemName,
            category,
            images,
            description,
            LocationFound,
        } = req.body;

        if (
            !userId ||
            !itemName ||
            !category ||
            !description ||
            !LocationFound
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        if (
            !Array.isArray(images) ||
            images.length < 3
        ) {
            return res.status(400).json({
                success: false,
                message: "At least 3 images are required",
            });
        }

        const foundItem = await FoundItem.create({
            userId,
            itemName,
            category,
            images: images,
            description,
            LocationFound,
        });

        // const populatedItem = await LostItem.findById(
        //     lostItem._id
        // ).populate("userId");

        // console.log(
        //     "User Name:",
        //     populatedItem.userId.name
        // );

        return res.status(201).json({
            success: true,
            message: "found item reported successfully",
            foundItem,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
