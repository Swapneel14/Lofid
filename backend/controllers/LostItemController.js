import LostItem from "../models/LostItem.js";

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

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
      populatedItem.userId
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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
