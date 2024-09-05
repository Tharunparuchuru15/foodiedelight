// RestaurantList.test.js

import { render, screen } from "@testing-library/react";
import RestaurantList from "./components/RestaurantList";

const mockRestaurants = [
  {
    id: 1,
    name: "Restaurant One",
    description: "Best food",
    location: "Location 1",
  },
  {
    id: 2,
    name: "Restaurant Two",
    description: "Great ambiance",
    location: "Location 2",
  },
];

test("renders the restaurant list", () => {
  render(
    <RestaurantList
      restaurants={mockRestaurants}
      deleteRestaurant={() => {}}
      editRestaurant={() => {}}
    />
  );

  expect(screen.getByText("Restaurant One")).toBeInTheDocument();
  expect(screen.getByText("Restaurant Two")).toBeInTheDocument();
});

test("renders no restaurants message when list is empty", () => {
  render(
    <RestaurantList
      restaurants={[]}
      deleteRestaurant={() => {}}
      editRestaurant={() => {}}
    />
  );

  expect(screen.getByText("No restaurants added yet.")).toBeInTheDocument();
});

test("displays message when no restaurants are available", () => {
  render(
    <RestaurantList
      restaurants={[]}
      deleteRestaurant={() => {}}
      editRestaurant={() => {}}
    />
  );

  expect(screen.getByText(/no restaurants added yet/i)).toBeInTheDocument();
});

test("displays message when no restaurants are available", () => {
  render(
    <RestaurantList
      restaurants={[]}
      deleteRestaurant={() => {}}
      editRestaurant={() => {}}
    />
  );

  expect(screen.getByText(/no restaurants added yet/i)).toBeInTheDocument();
});
