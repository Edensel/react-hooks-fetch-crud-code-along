import React from 'react';

function Filter({ category, onCategoryChange }) {
  return (
    <div>
      <label>Filter by Category: </label>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="All">All</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
      </select>
    </div>
  );
}

export default Filter;
