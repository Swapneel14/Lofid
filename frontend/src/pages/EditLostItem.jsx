import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/EditLostItem.css";

function EditLostItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    lostDate: "",
    lostTime: "",
    lostLocation: "",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6769/api/item/lost-item/${id}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:6769/api/item/update-lost-item/${id}`,
        formData,
      );

      if (response.data.success) {
        alert("Item updated successfully");

        navigate("/all-lost-items");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-lost-wrapper">
      <div className="edit-lost-card">
        <div className="edit-header">
          <h1>Edit Lost Item</h1>
          <p>Update your lost item report details</p>
        </div>

        <form className="edit-form">
          <div className="edit-form-group">
            <label>Item Name</label>
            <input type="text" />
          </div>

          <div className="edit-row">
            <div className="edit-form-group">
              <label>Date Lost</label>
              <input type="date" />
            </div>

            <div className="edit-form-group">
              <label>Time Lost</label>
              <input type="time" />
            </div>
          </div>

          <div className="edit-actions">
            <button className="update-btn">Update Report</button>

            <button type="button" className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLostItem;
