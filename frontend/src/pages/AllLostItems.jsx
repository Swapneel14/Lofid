import "../css/AllLostItems.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/react";

function AllLostItems() {
  const { user } = useUser();

  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6769/api/item/all-lost-items"
      );

      if (response.data.success) {
        setLostItems(response.data.lostItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (itemId) => {
    console.log("Edit:", itemId);

    // navigate(`/edit-lost-item/${itemId}`)
  };

  return (
    <div className="lost-items-page">

      <div className="lost-items-header">
        <h1>Lost & Missing Reports</h1>

        <p>
          Browse all reported lost items across campus
        </p>
      </div>

      <div className="lost-items-grid">

        {lostItems.map((item) => (

          <div
            key={item._id}
            className="lost-item-card"
          >

            <div className="lost-item-image">

              <img
                src="https://media.sketchfab.com/models/b95d1fb03912417dbbd61bea0b5b4e15/thumbnails/98f4f78d60474b8d929eecc2c81d32ac/3b55b4c517d748b499fd1cf8eeb6bdc3.jpeg"
                alt="lost item"
              />

            </div>

            <div className="lost-item-content">
              <div className="item-header">
                <h3>{item.itemName}</h3>

                <span className="category-badge">
                  {item.category}
                </span>
              </div>
              <div className="item-details">

                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{item.lostLocation}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {new Date(item.lostDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{item.lostTime}</span>
                </div>

              </div>

              <div className="reporter-section">
                <span className="reporter-label">Reported by</span>
                <span className="reporter-name">
                  {item.userId?.name}
                </span>
              </div>
              {user?.id === item.userId?._id ? (

                <div className="owner-actions">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item._id)}
                  >
                    ✏️ Edit Report
                  </button>

                  <button
                    className="mark-found-btn"
                    onClick={() => handleMarkFound(item._id)}
                  >
                    ✓ Mark as Found
                  </button>

                </div>

              ) : (

                <button
                  className="found-btn"
                  onClick={() => handleFound(item._id)}
                >
                  🔍 I Found This Item
                </button>

              )}

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default AllLostItems;