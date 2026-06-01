import "../../css/FoundForm.css";
import { useState } from "react";

function FoundForm() {

  const today = new Date().toISOString().split("T")[0]; // Today's date as YYYY-MM-DD

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {

    setSelectedFiles( (prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),

    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFiles.length < 3) {
      alert("Please upload at least 3 images.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="found-form-wrapper">
      <div className="form-card">
        <h1 className="form-header">Found Something?</h1>

        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="form-group">
            <label>Item Name <span className="required">*</span></label>
            <input type="text" placeholder="e.g. Black Wallet" required />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label>Item Category <span className="required">*</span></label>
            <select required>
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
                className={`file-name-display ${
                  selectedFiles.length >= 3 ? "success-text" : "error-text"
                }`}
                value={
                  selectedFiles.length === 0
                    ? "0/3 images uploaded"
                    : `${selectedFiles.length}/3 images uploaded ${
                        selectedFiles.length >= 3 ? "✅" : "❌"
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
            />
          </div>

          {/* Time When Found */}
          <div className="form-group">
            <label>Time When Found <span className="required">*</span></label>
            <input type="time" required />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location Found <span className="required">*</span></label>
            <input
              type="text"
              placeholder="e.g. Library, CST department corridor, Canteen"
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