import "../../css/LostForm.css";
import { useState } from "react";

function LostForm() {

  const today = new Date().toISOString().split("T")[0];

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {

    const files = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {

    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Lost item report submitted successfully!");
  };

  return (

    <div className="lost-form-wrapper">

      <div className="form-card">

        <h1 className="form-header">
          Lost Something?
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Item Name */}

          <div className="form-group">

            <label>
              Item Name <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Black Wallet"
              required
            />

          </div>

          {/* Category */}

          <div className="form-group">

            <label>
              Item Category <span className="required">*</span>
            </label>

            <select required>

              <option value="">
                Select a category
              </option>

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
              Upload Reference Images <span className="optional">(Optional)</span>
            </label>

            <p className="image-instructions">
              📸 Upload photos of your lost item if available.
              Clear images help others identify and return your item faster.
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
              placeholder="Describe the item in detail — color, brand, condition, stickers, scratches, or any unique features."
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
              placeholder="e.g. Library, CST department corridor, Canteen"
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