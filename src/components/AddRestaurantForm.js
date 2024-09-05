import React, { useState, useEffect } from "react";
import "../App.css";

const AddRestaurantForm = ({
  addRestaurant,
  editingRestaurant,
  restaurants,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  // Populate the form when editing a restaurant
  useEffect(() => {
    if (editingRestaurant) {
      setFormData(editingRestaurant);
    } else {
      setFormData({ name: "", description: "", location: "" });
    }
  }, [editingRestaurant]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation logic
  // const validate = () => {
  //   const errors = {};
  //   if (!formData.name) {
  //     errors.name = 'Restaurant name is required';
  //   } else if (formData.name.length < 2) {
  //     errors.name = 'Restaurant name must be at least 2 characters';
  //   } else if (
  //     restaurants.some(
  //       (restaurant) =>
  //         restaurant.name.toLowerCase() === formData.name.toLowerCase() &&
  //         (!editingRestaurant || editingRestaurant.name.toLowerCase() !== formData.name.toLowerCase())
  //     )
  //   ) {
  //     errors.name = 'Restaurant name already exists. Please choose a different name.';
  //   }

  //   if (!formData.description) {
  //     errors.description = 'Description is required';
  //   } else if (formData.description.length < 10) {
  //     errors.description = 'Description must be at least 10 characters';
  //   }

  //   if (!formData.location) {
  //     errors.location = 'Location is required';
  //   }

  //   return errors;
  // };

  const validate = () => {
    const errors = {};

    // Validate name
    if (!formData.name) {
      errors.name = "Restaurant name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Restaurant name must be at least 2 characters";
    } else if (formData.name.length > 50) {
      errors.name = "Restaurant name cannot be longer than 50 characters";
    } else if (
      restaurants.some(
        (restaurant) =>
          restaurant.name.toLowerCase() === formData.name.toLowerCase() &&
          (!editingRestaurant ||
            editingRestaurant.name.toLowerCase() !==
              formData.name.toLowerCase())
      )
    ) {
      errors.name =
        "Restaurant name already exists. Please choose a different name.";
    }

    // Validate description
    if (!formData.description) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 200) {
      errors.description = "Description cannot be longer than 200 characters";
    }

    // Validate location
    if (!formData.location) {
      errors.location = "Location is required";
    } else if (formData.location.length > 100) {
      errors.location = "Location cannot be longer than 100 characters";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedRestaurant = {
        ...formData,
        id: editingRestaurant ? editingRestaurant.id : Date.now(),
      };
      addRestaurant(updatedRestaurant);

      // Clear form after submission
      setFormData({ name: "", description: "", location: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Restaurant Name</label>{" "}
        {/* Make sure this matches the test */}
        <input
          type="text"
          name="name"
          id="name" // Match with the "htmlFor"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>{" "}
        {/* Make sure this matches the test */}
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="location">Location</label>{" "}
        {/* Make sure this matches the test */}
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}
      </div>

      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurantForm;
