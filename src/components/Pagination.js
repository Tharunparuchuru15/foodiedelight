import React from "react";
import "../App.css"; // Add necessary CSS styles here

const Pagination = ({
  restaurantsPerPage,
  totalRestaurants,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  // Calculate the number of pages required
  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
