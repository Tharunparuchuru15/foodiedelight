import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantList from "./components/RestaurantList";
import AddRestaurantForm from "./components/AddRestaurantForm";
import Pagination from "./components/Pagination";


// Import mock API functions
import {
  fetchRestaurants,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
} from "./components/mockApi";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 6;

  // Fetch restaurants from the mock API
  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants(); // Load restaurants when the component mounts
  }, []);

  // Add a restaurant
  const handleAddRestaurant = async (newRestaurant) => {
    setLoading(true);
    try {
      const addedRestaurant = await addRestaurant(newRestaurant);
      setRestaurants([...restaurants, addedRestaurant]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit a restaurant
  const handleEditRestaurant = async (updatedRestaurant) => {
    setLoading(true);
    try {
      const editedRestaurant = await editRestaurant(
        editingRestaurant.id,
        updatedRestaurant
      );
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant.id === editingRestaurant.id ? editedRestaurant : restaurant
        )
      );
      setEditingRestaurant(null);
    } catch (err) {
      setError("Failed to update the restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a restaurant
  const handleDeleteRestaurant = async (id) => {
    setLoading(true);
    try {
      await deleteRestaurant(id);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      setError("Failed to delete the restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>FOODIE DELIGHT</h1>
      {error && <p className="error">{error}</p>}{" "}
      {/* Display any error messages */}
      {loading && <p>Loading...</p>} {/* Show loading spinner/message */}
      <AddRestaurantForm
        addRestaurant={
          editingRestaurant ? handleEditRestaurant : handleAddRestaurant
        }
        editingRestaurant={editingRestaurant}
        restaurants={restaurants}
      />
      <RestaurantList
        restaurants={currentRestaurants}
        deleteRestaurant={handleDeleteRestaurant}
        editRestaurant={(restaurant) => setEditingRestaurant(restaurant)}
      />
      <Pagination
        restaurantsPerPage={restaurantsPerPage}
        totalRestaurants={restaurants.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
