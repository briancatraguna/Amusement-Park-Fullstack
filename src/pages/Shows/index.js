import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import SectionFilter from "../../components/SectionFilter";
import ShowList from "../../components/ShowsList";
import { getShows, getShowTypes } from "../../utils/api";
import { emitNotification } from "../../utils/emitNotification";
import { SectionModel } from "../../utils/model_helper";
import './style.css'

const ShowsPage = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    const [showTypes, setShowTypes] = useState([]);
    const [shows, setShows] = useState([]);
    const [selectedShowTypeId, setSelectedShowTypeId] = useState(0);

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
                console.log(showTypes);
                setShowTypes(showTypes);
            } catch (error) {
                emitNotification("error", error.response.data.message);
            }
        };
        fetchShowTypes();
    }, [accessToken]);

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
                <ShowList shows={shows}/>
            </div>
        </div>
    )
};

export default ShowsPage;