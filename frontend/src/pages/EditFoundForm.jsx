import "../css/FoundForm.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditFoundForm() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!itemId;

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    LocationFound: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6769/api/item/found-item/${itemId}`,
      );

      const item = response.data.foundItem;
      setExistingImages(item.images);

      setFormData({
        itemName: item.itemName,
        category: item.category,
        description: item.description,
        LocationFound: item.LocationFound,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch item details");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedFiles.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const data = new FormData();

    data.append("itemName", formData.itemName);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("LocationFound", formData.LocationFound);

    data.append("existingImages", JSON.stringify(existingImages));

    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      const response = await axios.put(
        `http://localhost:6769/api/item/update-found-item/${itemId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        alert("Report updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="found-form-wrapper">
      <div className="form-card">
        <h1 className="form-header">Edit Found Item</h1>

        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="form-group">
            <label>
              Item Name <span className="required">*</span>
            </label>
            <input
              type="text"
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

          {/* Images */}
          <div className="form-group">
            <label>
              Upload Images <span className="optional">(Optional)</span>
            </label>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <>
                <p className="image-instructions">Existing Images</p>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  {existingImages.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={image.url}
                        alt=""
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "1px solid #ddd",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          border: "none",
                          background: "#ff4d4f",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* New Images */}
            <p className="image-instructions">Add New Images</p>

            <div className="file-input-row">
              <input
                type="text"
                className="file-name-display"
                value={
                  selectedFiles.length === 0
                    ? "No new images selected"
                    : `${selectedFiles.length} image(s) selected`
                }
                readOnly
              />

              <label
                className={`file-select-btn ${isSubmitting ? "disabled" : ""}`}
                style={{
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                Select Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleFileChange}
                  disabled={isSubmitting}
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

          {/* Location */}
          <div className="form-group">
            <label>
              Location Found <span className="required">*</span>
            </label>

            <input
              type="text"
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

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <style>
                    {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                  </style>
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                Submitting...
              </>
            ) : isEditMode ? (
              "Update Report"
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFoundForm;
