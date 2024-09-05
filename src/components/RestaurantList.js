import React from "react";
import "../App.css";

const RestaurantList = ({ restaurants, deleteRestaurant, editRestaurant }) => {
  return (
    <div>
      <h2>Restaurant List</h2>
      <div className="restaurant-list-container">
        {restaurants.length === 0 ? (
          <p>No restaurants added yet.</p>
        ) : (
          <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <strong>{restaurant.name}</strong> 
              <span>- {restaurant.description} ({restaurant.location})</span>
              <div>
                <button className="edit-btn" onClick={() => editRestaurant(restaurant)}>
                  Edit
                </button>{" "}
                <button className="delete-btn" onClick={() => deleteRestaurant(restaurant.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
