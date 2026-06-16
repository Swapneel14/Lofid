import FoundItem from "../models/FoundItem.js"; // Adjust paths based on your architecture
import LostItem from "../models/LostItem.js";

/**
 * @desc    Get all lost and found items combined for a specific user
 * @route   GET /api/items/user/:userId
 * @access  Private (Ensure you use a Clerk or custom auth middleware)
 */
export const getUserItems = async (req, res) => {
  try {
    // Get userId either from route parameters or directly from your auth middleware (e.g., req.auth.userId)
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required." 
      });
    }

    // Fetch data from both collections concurrently for better performance
    const [lostItems, foundItems] = await Promise.all([
      LostItem.find({ userId }).lean(),
      FoundItem.find({ userId }).lean()
    ]);

    // Map and normalize fields so the frontend doesn't break on different key schemas
    const normalizedLost = lostItems.map(item => ({
      _id: item._id,
      userId: item.userId,
      itemName: item.itemName,
      category: item.category,
      images: item.images || [],
      description: item.description,
      location: item.lostLocation, // Normalized key
      status: item.status.toLowerCase(), // returns 'lost'
      date: item.lostDate,
      time: item.lostTime,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    const normalizedFound = foundItems.map(item => ({
      _id: item._id,
      userId: item.userId,
      itemName: item.itemName,
      category: item.category,
      images: item.images || [],
      description: item.description,
      location: item.LocationFound, // Normalized key
      status: item.status.toLowerCase(), // returns 'found'
      date: item.createdAt, // Using createdAt fallback since FoundItem doesn't enforce a separate date field
      time: null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    // Merge both arrays
    const allItems = [...normalizedLost, ...normalizedFound];

    // Sort items by creation date (newest posts first)
    allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Send unified payload back to the React UI
    return res.status(200).json({
      success: true,
      count: allItems.length,
      data: allItems
    });

  } catch (error) {
    console.error("Error in AllItemController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while compiling user items.",
      error: error.message
    });
  }
};