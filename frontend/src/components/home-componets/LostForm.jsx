import React, { useState } from "react";
import "../../css/LostForm.css"

function LostForm() {

    const [formData, setFormData] = useState({
        image: null,
        description: "",
        location: "",
        datetime: ""
    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({
                ...formData,
                image: files[0]
            });
        }

        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        alert("Lost item submitted successfully!");
    };

    return (

        <div className="lost-form-page">

            <form className="lost-form" onSubmit={handleSubmit}>

                <h2 className="form-title">
                    Report Lost Item
                </h2>

                {/* Image Upload */}

                <div className="form-group">

                    <label>
                        Upload Reference Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-input file-input"
                    />

                </div>

                {/* Description */}

                <div className="form-group">

                    <label>
                        Item Description *
                    </label>

                    <textarea
                        name="description"
                        placeholder="Describe your lost item..."
                        value={formData.description}
                        onChange={handleChange}
                        className="form-input textarea-input"
                        required
                    />

                </div>

                {/* Location */}

                <div className="form-group">

                    <label>
                        Lost Location *
                    </label>

                    <input
                        type="text"
                        name="location"
                        placeholder="Where did you lose it?"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                </div>

                {/* Date and Time */}

                <div className="form-group">

                    <label>
                        Date & Time Lost *
                    </label>

                    <input
                        type="datetime-local"
                        name="datetime"
                        value={formData.datetime}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                </div>

                {/* Submit Button */}

                <button type="submit" className="submit-btn">
                    Submit Report
                </button>

            </form>

        </div>
    );
}

export default LostForm;