import React from "react";
import "./style.css";

const SectionFilter = ({filterName, filterItems, handleItemClick }) => {

  return (
    <div className="section-filter-container">
      <h3>Filter by {filterName}:</h3>
      <div className="section-filter">
        {filterItems.map((item) => (
          <div
            className='section'
            onClick={() => handleItemClick(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFilter;
