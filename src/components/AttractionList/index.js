import React from "react";
import "./style.css";

const AttractionList = ({ attractions }) => {
  return (
    <div className="attraction-list">
      {attractions.map((attraction) => (
        <div key={attraction.attr_id} className="attraction-item">
          <div className="attraction-img-container">
            <img
              className="attraction-img"
              src={attraction.attr_img_url}
              alt={attraction.attr_name}
            />
          </div>
          <div className="attraction-details-container">
          <div className="attraction-label">Name:</div>
            <div className="attraction-name">{attraction.attr_name}</div>
            <div className="attraction-label">Description:</div>
            <div className="attraction-desc">{attraction.attr_desc}</div>
            <div className="attraction-label">Type:</div>
            <div className="attraction-type">{attraction.attr_type}</div>
            <div className="attraction-label">Status:</div>
            <div className="attraction-status">{attraction.attr_status}</div>
            <div className="attraction-label">Capacity:</div>
            <div className="attraction-capacity">
              {`${attraction.attr_capacity} persons`}
            </div>
            <div className="attraction-label">Minimum Height:</div>
            <div className="attraction-height">{`${attraction.min_height} cm`}</div>
            <div className="attraction-label">Duration:</div>
            <div className="attraction-duration">
              {`${attraction.attr_duration} minutes`}
            </div>
            <div className="attraction-lot-section-id">
              {attraction.lot_section_id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttractionList;
