import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references User_id (Clerk user id)
      required: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Clothing & Accessories",
        "Books & Stationery",
        "ID & Documents",
        "Keys",
        "Bags & Backpacks",
        "Water Bottles & Tiffin",
        "Jewellery & Watches",
        "Sports Equipment",
        "Wallet & Purse",
        "Other",
      ],
    },

    images: [
      {
        type: String, // image URLs
      },
    ],

    description: {
      type: String,
      required: true,
      trim: true,
    },

    lostDate: {
      type: Date,
      required: true,
    },

    lostTime: {
      type: String,
      required: true,
    },

    lostLocation: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Lost", "Found", "Claimed"],
      default: "Lost",
    },
  },
  {
    timestamps: true,
    minimize: false
  },
);

const LostItem = mongoose.models.LostItem || mongoose.model("LostItem", lostItemSchema);

export default LostItem;
