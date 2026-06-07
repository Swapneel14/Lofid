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
        <h1>Lost Items</h1>

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

              <h3>{item.itemName}</h3>

              <span className="category-badge">
                {item.category}
              </span>

              <p>
                Location - {item.lostLocation}
              </p>

              <p>
                Date - {new Date(item.lostDate)
                  .toLocaleDateString()}
              </p>

              <p>
                Time - {item.lostTime}
              </p>

              <p className="reported-by">
                Reported by -
                {" "}
                {item.userId?.name}
              </p>

              {user?.id === item.userId?._id && (

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(item._id)
                  }
                >
                  ✎𓂃 Edit Report
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