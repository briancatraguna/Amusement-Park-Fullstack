import React from "react";
import './style.css'

const AttractionList = ({ attractions }) => {
    return (
      <div className="attraction-list">
        {attractions.map((attraction) => (
          <div key={attraction.attr_id} className="attraction-item">
            <div className="attraction-name">{attraction.attr_name}</div>
            <div className="attraction-desc">{attraction.attr_desc}</div>
            <div className="attraction-type">{attraction.attr_type}</div>
            <div className="attraction-status">{attraction.attr_status}</div>
            <div className="attraction-capacity">{attraction.attr_capacity}</div>
            <div className="attraction-height">{attraction.min_height}</div>
            <div className="attraction-duration">{attraction.attr_duration}</div>
            <div className="attraction-lot-section-id">
              {attraction.lot_section_id}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default AttractionList;