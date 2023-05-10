import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import QuantitySelectorWithGroupModal from "../../components/QuantitySelectorWithGroup";
import SectionFilter from "../../components/SectionFilter";
import ShowList from "../../components/ShowsList";
import { addShowTickets } from "../../redux/cartSlice";
import { getShows, getShowTypes, getUserProfile } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";
import { SectionModel } from "../../utils/model_helper";
import './style.css'

const ShowsPage = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const user = useSelector((state) => state.userInfo.user);

    const [showTypes, setShowTypes] = useState([]);
    const [shows, setShows] = useState([]);
    const [selectedShowTypeId, setSelectedShowTypeId] = useState(0);
    const [groups, setGroups] = useState([]);
    const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState();
    const [selectedShowItem, setSelectedShowItem] = useState(null);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const showTypeId = selectedShowTypeId === 0 ? null : selectedShowTypeId;
                const showsResponse = await getShows(accessToken, showTypeId);
                setShows(showsResponse.data.shows);
            } catch (error) {
                emitNotification("error", error.response.data.message);
            }
        };
        fetchShows();
    }, [selectedShowTypeId, accessToken]);

    useEffect(() => {
        const fetchShowTypes = async () => {
            try {
                const showTypesResponse = await getShowTypes(accessToken);
                const showTypes = showTypesResponse.data.showTypes;
                showTypes.push({
                    show_type_id: 0,
                    show_type__name: "All"
                });
                setShowTypes(showTypes);
            } catch (error) {
                emitNotification("error", error.response.data.message);
            }
        };
        fetchShowTypes();
        const fetchUserProfile = async () => {
            try {
                const userProfileResponse = await getUserProfile(accessToken, user.user_id);
                setGroups(userProfileResponse.data.newGroupData);
            } catch (error) {
                emitNotification("error", error.response.data.message);
            }
        };
        fetchUserProfile();
    }, [accessToken]);

    const handleAddToCartButtonClick = (show) => {
        setIsQuantitySelectorOpen(true);
        setSelectedShowItem(show);
    }

    const handleAddToCart = (selectedGroup, quantity) => {
        dispatch(
            addShowTickets({
                quantity: quantity,
                item: selectedShowItem,
                group: selectedGroup,
                id: selectedShowItem.sw_id
            })
        );
        emitNotification("success","Show tickets added to cart!")
    }

    return (
        <div>
            <Header/>
            <div className="shows-container">
                <div className="filter">
                    <SectionFilter
                    filterName="Show Type"
                    filterItems={showTypes.map(
                        (type) => new SectionModel(
                            type.show_type_id,
                            type.show_type__name
                        )
                    )}
                    handleItemClick={(type_id) => {
                        setSelectedShowTypeId(type_id);
                    }}
                    />
                </div>
                <ShowList shows={shows} handleAddToCart={(show) => {handleAddToCartButtonClick(show)}}/>
            </div>
            {selectedShowItem && (
                <QuantitySelectorWithGroupModal
                isOpen={isQuantitySelectorOpen}
                itemTitle={selectedShowItem.sw_name}
                pricePerItem={selectedShowItem.sw_price}
                onClose={() => setIsQuantitySelectorOpen(false)}
                onAddToCart={(selectedGroup, quantity) => handleAddToCart(selectedGroup, quantity)}
                groupData={groups}
                />
            )}
        </div>
    )
};

export default ShowsPage;