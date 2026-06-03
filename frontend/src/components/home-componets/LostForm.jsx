import "../../css/LostForm.css";
import axios from "axios";
import { useUser } from "@clerk/react";
import { useState } from "react";

function LostForm() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    lostDate: "",
    lostTime: "",
    lostLocation: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    console.log({
      userId: user?.id,
      ...formData,
    });

    try {
      const response = await axios.post(
        "http://localhost:6769/api/item/create-lost-item",
        {
          userId: user?.id, // replace with logged-in user's id
          itemName: formData.itemName,
          category: formData.category,
          description: formData.description,
          lostDate: formData.lostDate,
          lostTime: formData.lostTime,
          lostLocation: formData.lostLocation,
          images: [],
        },
      );

      if (response.data.success) {
        alert("Lost item reported successfully!");

        setFormData({
          itemName: "",
          category: "",
          description: "",
          lostDate: "",
          lostTime: "",
          lostLocation: "",
        });

        setSelectedFiles([]);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to submit report");
    }
  };

  return (
    <div className="lost-form-wrapper">
      <div className="form-card">
        <h1 className="form-header">Lost Something?</h1>

        <form onSubmit={handleSubmit}>
          {/* Item Name */}

          <div className="form-group">
            <label>
              Item Name <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Black Wallet"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  itemName: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Category */}

          <div className="form-group">
            <label>
              Item Category <span className="required">*</span>
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              required
            >
              <option value="">Select a category</option>

              <option>Electronics</option>

              <option>Clothing & Accessories</option>

              <option>Books & Stationery</option>

              <option>ID & Documents</option>

              <option>Keys</option>

              <option>Bags & Backpacks</option>

              <option>Water Bottles & Tiffin</option>

              <option>Jewellery & Watches</option>

              <option>Sports Equipment</option>

              <option>Wallet & Purse</option>

              <option>Other</option>
            </select>
          </div>

          {/* Images Optional */}

          <div className="form-group">
            <label>
              Upload Reference Images{" "}
              <span className="optional">(Optional)</span>
            </label>

            <p className="image-instructions">
              📸 Upload photos of your lost item if available. Clear images help
              others identify and return your item faster.
            </p>

            <div className="file-input-row">
              <input
                type="text"
                className="file-name-display"
                value={
                  selectedFiles.length === 0
                    ? "No images selected"
                    : `${selectedFiles.length} image(s) selected`
                }
                readOnly
              />

              <label className="file-select-btn">
                Select Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="selected-files-box">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="selected-file-item">
                    <span>{file.name}</span>

                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}

          <div className="form-group">
            <label>
              Item Description <span className="required">*</span>
            </label>

            <textarea
              rows="4"
              placeholder="Describe the item..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Date Lost */}

          <div className="form-group">
            <label>
              Date Lost <span className="required">*</span>
            </label>

            <input
              type="date"
              max={today}
              value={formData.lostDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lostDate: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Time Lost */}

          <div className="form-group">
            <label>
              Time Lost <span className="required">*</span>
            </label>

            <input
              type="time"
              value={formData.lostTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lostTime: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Location */}

          <div className="form-group">
            <label>
              Location Lost <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Library"
              value={formData.lostLocation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lostLocation: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Submit */}

          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default LostForm;
