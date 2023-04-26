import React from "react";
import "./style.css";

const LotSectionFilter = ({ attractionLots, selectedLotId, handleLotClick }) => {

  return (
    <div className="lot-section-filter-container">
      <h3>Filter by Lot Section:</h3>
      <div className="lot-section-filter">
        {attractionLots.map((lot) => (
          <div
            key={lot.lot_section_no}
            className={`lot-section ${
              selectedLotId && selectedLotId === lot.lot_section_no ? "selected" : ""
            }`}
            onClick={() => handleLotClick(lot.lot_section_no)}
          >
            {lot.lot_section_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotSectionFilter;
