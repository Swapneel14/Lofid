import "../css/AllLostItems.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ChatRoom from "../components/home-componets/ChatRoom";
const fallbackImage =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";

function AllLostItems() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchLostItems();
  }, [search]);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6769/api/item/all-lost-items?search=${search}`,
      );

      if (response.data.success) {
        setLostItems(response.data.lostItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkFound = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to mark this item as found? This will delete the item.",
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:6769/api/item/delete-lost-item/${itemId}`,
      );

      if (response.data.success) {
        setLostItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId),
        );

        alert("Item marked as found and report deleted.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete report.");
    }
  };

  const handleFound = (itemId) => {
    console.log("I found this item:", itemId);
  };

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <div
          className="card shadow-lg border-0 text-center p-4"
          style={{
            maxWidth: "450px",
            width: "90%",
            borderRadius: "20px",
          }}
        >
          <div style={{ fontSize: "4rem" }}>🔒</div>

          <h2 className="fw-bold mt-3">Login Required</h2>

          <p className="text-muted">
            Please sign in to view lost item reports and access chat rooms.
          </p>

          <SignInButton mode="modal">
            <button className="btn btn-primary btn-lg mt-2">Login</button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lost-items-page">
        <div className="lost-items-header">
          <h1>Lost & Missing Reports</h1>
          <p>Browse all reported lost items across campus</p>
        </div>

        <div className="lost-items-grid">
          {lostItems.map((item) => (
            <div key={item._id} className="lost-item-card">
              {/* IMAGE CAROUSEL */}
              <div className="lost-item-image">
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={true}
                  className="h-full w-full"
                  style={{
                    height: "100%",
                    minHeight: "200px",
                  }}
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

              {/* CONTENT */}
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
                      {new Date(item.lostDate).toLocaleDateString("en-IN")}
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

                <div
                  className={`item-actions ${
                    user?.id === item.userId?._id
                      ? "two-buttons"
                      : "single-button"
                  }`}
                >
                  {user?.id === item.userId?._id && (
                    <button
                      className="mark-found-btn"
                      onClick={() => handleMarkFound(item._id)}
                    >
                      Mark as Found
                    </button>
                  )}

                  <button
                    className="chat-btn"
                    onClick={() => setSelectedRoom(`lost-${item._id}`)}
                  >
                    Open Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <ChatRoom roomId={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </>
  );
}

export default AllLostItems;
