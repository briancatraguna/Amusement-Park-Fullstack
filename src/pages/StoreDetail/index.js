import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import { ROUTES } from "../../utils/enums";
import { getStoreMenu } from "../../utils/api";
import "./style.css";
import { Button } from "@mui/material";

const StoreDetailPage = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState();
  const [storeMenu, setStoreMenu] = useState();

  useEffect(() => {
    if (!searchParams.get("storeId") || !searchParams.get("storeName")) {
      navigate(ROUTES.stores);
    }
    const storeNameParams = searchParams.get("storeName");
    const storeIdParams = searchParams.get("storeId");
    setStoreName(storeNameParams);
    const fetchStoreMenu = async () => {
      try {
        const storeMenuResponse = await getStoreMenu(
          accessToken,
          storeIdParams
        );
        setStoreMenu(storeMenuResponse.data.storeMenu);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchStoreMenu();
  }, [accessToken, navigate, searchParams]);

  return (
    <div>
      <Header />
      <div className="store-detail-container">
        <div className="store-info">
          <h1>{storeName}</h1>
        </div>
        <div className="store-menu-container">
          {storeMenu &&
            storeMenu.map((menuItem) => (
              <div className="store-menu-item" key={menuItem.menu_item_id}>
                <img
                  src={menuItem.menu_img_url}
                  alt={menuItem.menu_item_name}
                />
                <div>
                  <h2>{menuItem.menu_item_name}</h2>
                  <p>{menuItem.item_desc}</p>
                  <p>{menuItem.item_price}</p>
                  <Button>Add to Cart</Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;