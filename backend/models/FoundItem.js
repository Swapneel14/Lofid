import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
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

        // images: {
        //     type: [String],
        //     validate: {
        //         validator: function (arr) {
        //             return arr.length >= 3;
        //         },
        //         message: "At least 3 images are required",
        //     },
        //     required: true,
        // },

        images: {
            type: [
                {
                    url: String,
                    public_id: String
                }
            ],
            validate: {
                validator: function (arr) {
                    return arr && arr.length >= 3;
                },
                message: "At least 3 images are required",
            },
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        LocationFound: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            default: "Found",
            enum: ["Found"],
        },
    },
    {
        timestamps: true,
        minimize: false
    },
);

const FoundItem = mongoose.models.FoundItem || mongoose.model("FoundItem", FoundItemSchema);

export default FoundItem;
