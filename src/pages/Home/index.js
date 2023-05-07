import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import QuantitySelectorWithGroupModal from "../../components/QuantitySelectorWithGroup";
import { addEntryTickets } from "../../redux/cartSlice";
import { getUserProfile } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";
import { ROUTES } from "../../utils/enums";
import "./style.css";

const TICKET_PRICE = 30;

const HomePage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.userInfo.user);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileResponse = await getUserProfile(
          accessToken,
          user.user_id
        );
        setGroups(userProfileResponse.data.newGroupData);
      } catch (error) {
        emitNotification("error", error.response.data.message);
      }
    };
    fetchUserProfile();
  },[accessToken, user]);

  const handleBuyTicketsClick = () => {
    setIsQuantitySelectorOpen(true);
  };

  const handleAddToCart = (selectedGroup, quantity) => {
    dispatch(
      addEntryTickets({
        quantity: quantity,
        price: TICKET_PRICE,
        group: selectedGroup,
      })
    );
    emitNotification("success","Entry tickets added to cart!")
  };

  return (
    <div className="background">
      <Header />
      <div className="image-container">
        <img
          src={require("../../assets/theme-park-image-home.jpeg")}
          className="theme-park-image-home"
          alt="theme park"
        />
        <div className="text-container">
          <h1>Welcome to Voyage of Amusements!</h1>
          <p>Experience the thrill of the rides and the attractions.</p>
          <button
            className="buy-tickets-button"
            onClick={handleBuyTicketsClick}
          >
            Buy Entry Tickets
          </button>
        </div>
        <div className="menu-container">
          <Link to={ROUTES.attractions}>
            <div className="menu-item">
              <img
                src={require("../../assets/attractions-image.jpeg")}
                alt="attractions"
                className="rounded"
              />
              <p>Attractions</p>
            </div>
          </Link>
          <Link to={ROUTES.shows}>
            <div className="menu-item">
              <img
                src={require("../../assets/shows-image.jpeg")}
                alt="shows"
                className="rounded"
              />
              <p>Shows</p>
            </div>
          </Link>
          <Link to={ROUTES.stores}>
            <div className="menu-item">
              <img
                src={require("../../assets/stores-image.avif")}
                alt="stores"
                className="rounded"
              />
              <p>Stores</p>
            </div>
          </Link>
          <Link to={ROUTES.tickets}>
            <div className="menu-item">
              <img
                src={require("../../assets/tickets-image.jpeg")}
                alt="tickets"
                className="rounded"
              />
              <p>Tickets</p>
            </div>
          </Link>
        </div>
      </div>
      {isQuantitySelectorOpen && (
        <QuantitySelectorWithGroupModal
          isOpen={isQuantitySelectorOpen}
          itemTitle="Entry Tickets"
          pricePerItem={TICKET_PRICE}
          onClose={() => setIsQuantitySelectorOpen(false)}
          onAddToCart={(selectedGroup, quantity) =>
            handleAddToCart(selectedGroup, quantity)
          }
          groupData={groups}
        />
      )}
    </div>
  );
};

export default HomePage;
