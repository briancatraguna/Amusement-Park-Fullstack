import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import { ROUTES } from "../../utils/enums";
import { getStoreMenu } from "../../utils/api";
import "./style.css";

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
        const storeMenuResponse = await getStoreMenu(accessToken, storeIdParams);
        console.log(storeMenuResponse.data.storeMenu);
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
    </div>
  );
};

export default StoreDetailPage;
