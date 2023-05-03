import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import SectionFilter from "../../components/SectionFilter";
import { getStoreCategories, getStores } from "../../utils/api";
import { ROUTES } from "../../utils/enums";
import { SectionModel } from "../../utils/model_helper";
import "./style.css";
import { emitNotification } from "../../utils/emitNotification";

const StoresPage = () => {
	const accessToken = useSelector((state) => state.auth.accessToken);

	const [storeCategories, setStoreCategories] = useState([]);
	const [stores, setStores] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const categoryId =
					selectedCategoryId === 0 ? null : selectedCategoryId;
				const storesResponse = await getStores(accessToken, categoryId);
				setStores(storesResponse.data.stores);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};
		fetchStores();
	}, [selectedCategoryId, accessToken]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoryResponse = await getStoreCategories(accessToken);
				const categories = categoryResponse.data.storeCategories;
				categories.push({ category_id: 0, category_name: "All" });
				setStoreCategories(categories);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};
		fetchCategories();
	}, [accessToken]);

	return (
		<div>
			<Header />
			<div className="stores-container">
				<div className="filter">
					<SectionFilter
						filterName="Store Category"
						filterItems={storeCategories.map(
							(category) =>
								new SectionModel(
									category.category_id,
									category.category_name
								)
						)}
						handleItemClick={(category_id) => {
							setSelectedCategoryId(category_id);
						}}
					/>
				</div>
				<div className="menu-container">
					{stores.map((store) => {
						const link =
							ROUTES.storeDetail +
							`?storeId=${store.store_id}&storeName=${store.store_name}`;
						return (
							<Link key={store.store_id} to={link}>
								<div className="menu-item">
									<img
										src={store.store_logo_url}
										alt={store.store_name}
									/>
									<p>{store.store_name}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default StoresPage;
