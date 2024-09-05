// mockApi.test.js

import {
  fetchRestaurants,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
} from "./components/mockApi";

test("fetches restaurants", async () => {
  const restaurants = await fetchRestaurants();
  expect(restaurants.length).toBeGreaterThan(0);
});

test("adds a restaurant", async () => {
  const newRestaurant = {
    name: "Test Restaurant",
    description: "Test description",
    location: "Test location",
  };
  const result = await addRestaurant(newRestaurant);
  expect(result).toEqual(expect.objectContaining(newRestaurant));
});

test("edits a restaurant", async () => {
  const updatedRestaurant = { name: "Updated Name" };
  const result = await editRestaurant(1, updatedRestaurant);
  expect(result.name).toBe("Updated Name");
});

test("deletes a restaurant", async () => {
  const result = await deleteRestaurant(1);
  expect(result.success).toBe(true);
});

test("returns error when adding a restaurant with a duplicate name", async () => {
  const newRestaurant = {
    name: "Restaurant One",
    description: "Great food",
    location: "Location 1",
  };

  // Try to add the same restaurant, which should trigger the rejection
  await expect(addRestaurant(newRestaurant)).rejects.toThrow(
    "Restaurant name already exists"
  );
});
