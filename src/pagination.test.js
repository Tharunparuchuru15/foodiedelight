import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./components/Pagination";

test("renders pagination and handles page changes", () => {
  const paginate = jest.fn();

  render(
    <Pagination
      restaurantsPerPage={10}
      totalRestaurants={30}
      paginate={paginate}
      currentPage={1}
    />
  );

  // Switch to getByText if the elements are not rendering with role="button"
  fireEvent.click(screen.getByText("2"));
  expect(paginate).toHaveBeenCalledWith(2);
});
