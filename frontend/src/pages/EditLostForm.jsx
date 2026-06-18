import "../css/LostForm.css";
import axios from "axios";
import { useUser } from "@clerk/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function LostForm() {
  const { user } = useUser();
  const { itemId } = useParams();
  const [existingImages, setExistingImages] = useState([]);

  const navigate = useNavigate();
  const isEditMode = !!itemId;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6769/api/item/lost-item/${itemId}`,
      );

      const item = response.data.lostItem;

      setFormData({
        itemName: item.itemName,
        category: item.category,
        description: item.description,
        lostDate: item.lostDate.split("T")[0],
        lostTime: item.lostTime,
        lostLocation: item.lostLocation,
      });

      setExistingImages(item.images);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    setIsSubmitting(true);

    // Converted to FormData so the selected images actually upload to the backend
    const data = new FormData();
    data.append("userId", user.id);
    data.append("itemName", formData.itemName);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("lostDate", formData.lostDate);
    data.append("lostTime", formData.lostTime);
    data.append("lostLocation", formData.lostLocation);

    data.append("existingImages", JSON.stringify(existingImages));

    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      let response;

      if (isEditMode) {
        response = await axios.put(
          `http://localhost:6769/api/item/update-lost-item/${itemId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        navigate("/");
      } else {
        response = await axios.post(
          "http://localhost:6769/api/item/create-lost-item",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      if (response.data.success) {
        alert(
          isEditMode
            ? "Report updated successfully!"
            : "Lost item reported successfully!",
        );

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
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lost-form-wrapper">
      <div className="form-card">
        <h1 className="form-header">
          {isEditMode ? "Edit Lost Item" : "Lost Something?"}
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

              <label
                className={`file-select-btn ${isSubmitting ? "disabled" : ""}`}
                style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
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
                      disabled={isSubmitting}
                      style={{
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
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

export default LostForm;
