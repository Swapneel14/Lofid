import "../css/AllLostItems.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/react";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";

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

  // Note: Make sure handleMarkFound and handleFound are defined in your file!
  const handleMarkFound = (itemId) => {
    console.log("Marking as found:", itemId);
  };

  const handleFound = (itemId) => {
    console.log("I found this item:", itemId);
  };

  return (
    <div className="lost-items-page">
      <div className="lost-items-header">
        <h1>Lost & Missing Reports</h1>
        <p>Browse all reported lost items across campus</p>
      </div>

      <div className="lost-items-grid">
        {lostItems.map((item) => (
          <div key={item._id} className="lost-item-card">
            
            {/* SWIPER IMAGE CAROUSEL */}
            <div className="lost-item-image">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                className="h-full w-full"
                style={{ height: "100%", minHeight: "200px" }} // Adjust height as needed if your CSS doesn't set it
              >
                {item.images && item.images.length > 0 ? (
                  item.images.map((image, index) => (
                    <SwiperSlide key={image.public_id || index}>
                      <img
                        src={image.url}
                        alt={`${item.itemName} - view ${index + 1}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      src={fallbackImage}
                      alt="No image available"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>

            {/* LOST ITEM CONTENT */}
            <div className="lost-item-content">
              <div className="item-header">
                <h3>{item.itemName}</h3>
                <span className="category-badge">{item.category}</span>
              </div>
              
              <div className="item-details">
                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{item.lostLocation}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">
                    {new Date(item.lostDate).toLocaleDateString('en-IN')}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{item.lostTime}</span>
                </div>
              </div>

              <div className="reporter-section">
                <span className="reporter-label">Reported by</span>
                <span className="reporter-name">{item.userId?.name}</span>
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