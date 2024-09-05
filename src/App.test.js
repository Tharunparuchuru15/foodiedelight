// App.test.js

import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";
import * as mockApi from "./components/mockApi"; // Mock the API calls

jest.mock("./components/mockApi");

test("fetches and displays restaurants from API", async () => {
  mockApi.fetchRestaurants.mockResolvedValue([
    {
      id: 1,
      name: "Test Restaurant",
      description: "Test description",
      location: "Test Location",
    },
  ]);

  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => screen.getByText("Test Restaurant"));

  expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
});

test("displays error message if API call fails", async () => {
  mockApi.fetchRestaurants.mockRejectedValue(new Error("Failed to fetch"));

  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => screen.getByText(/failed to load restaurants/i));

  expect(screen.getByText(/failed to load restaurants/i)).toBeInTheDocument();
});

test("displays error message if restaurant fetching fails", async () => {
  mockApi.fetchRestaurants.mockRejectedValueOnce(
    new Error("Failed to fetch restaurants")
  );

  render(<App />);

  await waitFor(() => screen.getByText(/failed to load restaurants/i));
  expect(screen.getByText(/failed to load restaurants/i)).toBeInTheDocument();
});

test("displays error when API call fails", async () => {
  mockApi.fetchRestaurants.mockRejectedValue(new Error("API call failed"));

  render(<App />);

  await waitFor(() => screen.getByText(/failed to load restaurants/i));
  expect(screen.getByText(/failed to load restaurants/i)).toBeInTheDocument();
});
