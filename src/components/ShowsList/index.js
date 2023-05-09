import { Box, Button, Card, CardMedia } from "@mui/material";
import React from "react";
import "./style.css";

const ShowList = ({ shows, handleAddToCart }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {shows.map((show) => (
        <Card key={show.sw_id} sx={{ width: 300, m: 2, backgroundColor:"#aeadf0" }}>
          <CardMedia
          className="card-media-show"
            component="img"
            image={show.sw_img_url}
            alt={show.sw_name}
          />
          <div className="show-card">
            <h2>{show.sw_name}</h2>
            <p>{show.sw_desc}</p>
            <hr />
            <p>Start: {formatDate(show.sw_start_time)}</p>
            <p>End: {formatDate(show.sw_end_time)}</p>
            <p>Price: ${show.sw_price}</p>
            <div className="accessibility">
              <span
                className={
                  show.wheelchair_access === "Y" ? "accessible" : "disabled"
                }
              ></span>
              <p>Wheelchair Access</p>
              <Button variant="contained" color="primary" onClick={() => handleAddToCart(show)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </Box>
  );
};

export default ShowList;
