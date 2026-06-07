import "../../css/FoundForm.css";
import axios from "axios";
import { useUser } from "@clerk/react";
import { useState } from "react";

function FoundForm() {


  const { user } = useUser();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    LocationFound: "",
  });

  const today = new Date().toISOString().split("T")[0]; // Today's date as YYYY-MM-DD

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedFiles.length + files.length > 5) {
        alert("You can only upload a maximum of 5 images.");
        return;
    }
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

    if (selectedFiles.length < 3) {
      alert("Please upload at least 3 images.");
      return;
    }

    // 1. Create FormData instance
    const data = new FormData();

    // 2. Append text fields
    data.append("userId", user.id);
    data.append("itemName", formData.itemName);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("LocationFound", formData.LocationFound);

    // 3. Append images (multiple files with the same key)
    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      // 4. Send request (Axios handles the headers automatically)
      const response = await axios.post(
        "http://localhost:6769/api/item/create-found-item",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Found item reported successfully!");
        setFormData({
          itemName: "",
          category: "",
          description: "",
          LocationFound: "",
        });
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit report");
    }
  };

  return (
    <div className="found-form-wrapper">
      <div className="form-card">
        <h1 className="form-header">Found Something?</h1>

        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="form-group">
            <label>Item Name <span className="required">*</span></label>
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

          {/* Category Dropdown */}
          <div className="form-group">
            <label>Item Category <span className="required">*</span></label>
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

          {/* Images */}
          <div className="form-group">
            <label>
              Upload Images <span className="required">*</span>
            </label>
            <p className="image-instructions">
              📸 Please upload <span className="required"><strong>at least 3 photos</strong></span> of the item
              from different angles:
              <br />
              <span>
                ① Front view &nbsp; ② Back view &nbsp; ③ Any unique feature or
                label
              </span>
            </p>
            <div className="file-input-row">
              <input
                type="text"
                className={`file-name-display ${selectedFiles.length >= 3 ? "success-text" : "error-text"
                  }`}
                value={
                  selectedFiles.length === 0
                    ? "0/3 images uploaded"
                    : `${selectedFiles.length}/3 images uploaded ${selectedFiles.length >= 3 ? "✅" : "❌"
                    }`
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

          {/* Item Description */}
          <div className="form-group">
            <label>Item Description <span className="required">*</span></label>
            <textarea
              rows="4"
              placeholder="Describe the item in detail — color, brand, condition, any markings etc."
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


          {/* Marking this as unnecessary */}
          {/* Time When Found */}
          {/* <div className="form-group">
            <label>Time When Found <span className="required">*</span></label>
            <input type="time" required />
          </div> */}

          {/* Location */}
          <div className="form-group">
            <label>Location Found <span className="required">*</span></label>
            <input
              type="text"
              placeholder="e.g. Library, CST department corridor, Canteen"
              value={formData.LocationFound}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  LocationFound: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoundForm;