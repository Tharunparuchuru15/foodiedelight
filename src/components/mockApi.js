// mockApi.js

// Mock restaurant data
let restaurants = [
  {
    id: 1,
    name: "Bawarchi",
    description: "Best in town",
    location: "Hyderabad",
  },
  {
    id: 2,
    name: "Meghana Foods",
    description: "Great food",
    location: "Bangalore",
  },
  {
    id: 3,
    name: "Hotel Chandralok",
    description: "Amazing ambiance",
    location: "Pune",
  },
];

// Fetch all restaurants (GET request)
export const fetchRestaurants = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...restaurants]);
    }, 500);
  });
};

export const addRestaurant = async (newRestaurant) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if the restaurant already exists by name
      const existingRestaurant = restaurants.some(
        (r) => r.name.toLowerCase() === newRestaurant.name.toLowerCase()
      );
      if (existingRestaurant) {
        reject(new Error("Restaurant name already exists")); // Reject with an error
      } else {
        const newEntry = { ...newRestaurant, id: Date.now() };
        restaurants.push(newEntry); // Add new restaurant
        resolve(newEntry); // Resolve with the new entry
      }
    }, 500); // Simulated delay
  });
};

// Edit a restaurant (PUT request)
export const editRestaurant = async (id, updatedRestaurant) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = restaurants.findIndex((r) => r.id === id);
      if (index !== -1) {
        restaurants[index] = { ...restaurants[index], ...updatedRestaurant };
        resolve(restaurants[index]);
      } else {
        reject(new Error("Restaurant not found"));
      }
    }, 500);
  });
};

// Delete a restaurant (DELETE request)
export const deleteRestaurant = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = restaurants.findIndex((r) => r.id === id);
      if (index !== -1) {
        restaurants.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error("Restaurant not found"));
      }
    }, 500);
  });
};
