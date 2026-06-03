import LostItem from "../models/LostItem.js";

export const createLostItem = async (req, res) => {
  try {
    const {
      userId,
      itemName,
      category,
      images,
      description,
      lostDate,
      lostTime,
      lostLocation,
    } = req.body;

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

    const lostItem = await LostItem.create({
      userId,
      itemName,
      category,
      images: images || [],
      description,
      lostDate,
      lostTime,
      lostLocation,
    });

    const populatedItem = await LostItem.findById(
      lostItem._id
    ).populate("userId");

    console.log(
      "User Name:",
      populatedItem.userId.name
    );

    return res.status(201).json({
      success: true,
      message: "Lost item reported successfully",
      lostItem,
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
