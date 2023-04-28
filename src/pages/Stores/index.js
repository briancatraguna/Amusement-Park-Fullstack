import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { getStoreCategories, getStores } from "../../utils/api";
import './style.css'

const StoresPage = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    const [storeCategories, setStoreCategories] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const categoryId = selectedCategoryId === 0 ? null : selectedCategoryId;
                const storesResponse = await getStores(accessToken, categoryId);
                setStores(storesResponse.data.stores);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        fetchStores();
    }, [selectedCategoryId, accessToken]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await getStoreCategories(accessToken);
                const categories = categoryResponse.data.storeCategories;
                categories.push({category_id: 0, category_name: "All"});
                setStoreCategories(categories);
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        fetchCategories()
    }, [accessToken]);

    return (
        <div>
            <Header/>

        </div>
    )
}

export default StoresPage;