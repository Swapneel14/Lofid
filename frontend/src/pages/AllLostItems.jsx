import "../css/AllLostItems.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { toast, ToastContainer } from 'react-toastify';
import { IoOpen } from "react-icons/io5";

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
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchLostItems();
  }, [search]);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/item/all-lost-items?search=${search}`
      );

      if (response.data.success) {
        setLostItems(response.data.lostItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const executeDelete = async () => {
    if (!deletingItemId) return;

    setIsDeleting(true); // Disable button and show spinner

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/item/delete-lost-item/${deletingItemId}`
      );
      if (response.data.success) {
        setLostItems((prevItems) =>
          prevItems.filter((item) => item._id !== deletingItemId)
        );

        setTimeout(() => {
          toast.success("Item marked as found and report deleted.", {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          });
        }, 100);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        toast.error("Failed to delete report.", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      }, 100);
    } finally {
      setIsDeleting(false);
      setDeletingItemId(null);
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
        <ToastContainer />
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
                  className={`item-actions ${user?.id === item.userId?._id
                    ? "two-buttons"
                    : "single-button"
                    }`}
                >
                  {user?.id === item.userId?._id && (
                    <button
                      className="mark-found-btn"
                      onClick={() => setDeletingItemId(item._id)}
                    >
                      Mark as Found
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedRoom(`lost-${item._id}`)}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  >
                    Chat Here
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <IoOpen />
                    </span>
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

      {deletingItemId && (
        <div className="fixed! inset-0! z-9999! flex! items-center! justify-center! bg-black/40 backdrop-blur-sm! p-5! px-4! transition-opacity!">
          <div className="bg-white! rounded-2xl! shadow-2xl! w-full! max-w-md! overflow-hidden! animate-in! fade-in! zoom-in-95! duration-200!">
            <div className="p-6!">
              <h3 className="text-xl! font-bold! text-slate-800! mb-2!">
                Mark Item as Found?
              </h3>
              <p className="text-slate-600! text-sm!">
                Are you sure you want to mark this item as found? This will permanently delete the report from the system.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-slate-50 px-6! py-4! flex justify-end gap-3! border-t! border-slate-100!">
              <button
                onClick={() => setDeletingItemId(null)}
                disabled={isDeleting}
                className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-white border! border-slate-400! rounded-lg! hover:bg-slate-200! transition-colors! focus:outline-none! focus:ring-2! focus:ring-slate-200! disabled:opacity-50! disabled:cursor-not-allowed!"
              >
                Cancel
              </button>

              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="flex! items-center! justify-center! px-4! py-2! text-sm! font-medium! text-white bg-blue-600 rounded-lg! hover:bg-blue-700! transition-colors! focus:outline-none! focus:ring-2! focus:ring-blue-500! disabled:bg-blue-400! disabled:cursor-not-allowed! min-w-35!!"
              >
                {isDeleting ? (
                  <>
                    {/* Tailwind Loading Spinner */}
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Yes, Mark Found"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllLostItems;
