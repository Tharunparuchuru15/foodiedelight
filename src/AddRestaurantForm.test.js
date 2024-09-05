import { render, fireEvent, screen } from "@testing-library/react";
import AddRestaurantForm from "./components/AddRestaurantForm";
import RestaurantList from "./components/RestaurantList";

const mockAddRestaurant = jest.fn();

test("renders form inputs and submit button", () => {
  render(
    <AddRestaurantForm addRestaurant={mockAddRestaurant} restaurants={[]} />
  );

  // Ensure the labels match what is in AddRestaurantForm.js
  expect(screen.getByLabelText("Restaurant Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Description")).toBeInTheDocument();
  expect(screen.getByLabelText("Location")).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /add restaurant/i })
  ).toBeInTheDocument();
});

test("shows validation errors when inputs are empty", () => {
  render(<AddRestaurantForm addRestaurant={() => {}} restaurants={[]} />);

  fireEvent.click(screen.getByRole("button", { name: /add restaurant/i }));

  expect(screen.getByText(/restaurant name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  expect(screen.getByText(/location is required/i)).toBeInTheDocument();
});

test("submits form when inputs are valid", () => {
  const mockAddRestaurant = jest.fn();

  render(
    <AddRestaurantForm addRestaurant={mockAddRestaurant} restaurants={[]} />
  );

  fireEvent.change(screen.getByLabelText(/restaurant name/i), {
    target: { value: "New Restaurant" },
  });
  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Great food and service" },
  });
  fireEvent.change(screen.getByLabelText(/location/i), {
    target: { value: "City Center" },
  });

  fireEvent.click(screen.getByRole("button", { name: /add restaurant/i }));

  expect(mockAddRestaurant).toHaveBeenCalledTimes(1);

  // Use objectContaining to ignore dynamic properties like id
  expect(mockAddRestaurant).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "New Restaurant",
      description: "Great food and service",
      location: "City Center",
    })
  );
});

test("renders restaurant list and handles delete", () => {
  const mockDeleteRestaurant = jest.fn();
  const restaurants = [
    {
      id: 1,
      name: "Restaurant One",
      description: "Description One",
      location: "Location One",
    },
  ];

  render(
    <RestaurantList
      restaurants={restaurants}
      deleteRestaurant={mockDeleteRestaurant}
      editRestaurant={() => {}}
    />
  );

  expect(screen.getByText("Restaurant One")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Delete"));
  expect(mockDeleteRestaurant).toHaveBeenCalledWith(1);
});

test("shows error when restaurant name is too short", () => {
  render(<AddRestaurantForm addRestaurant={() => {}} restaurants={[]} />);

  fireEvent.change(screen.getByLabelText(/restaurant name/i), {
    target: { value: "A" }, // too short
  });

  fireEvent.click(screen.getByRole("button", { name: /add restaurant/i }));

  expect(
    screen.getByText(/restaurant name must be at least 2 characters/i)
  ).toBeInTheDocument();
});
