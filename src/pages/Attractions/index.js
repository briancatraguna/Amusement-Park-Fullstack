import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AttractionList from "../../components/AttractionList";
import Header from "../../components/Header";
import SectionFilter from "../../components/SectionFilter";
import { getAttractions, getLotSections } from "../../utils/api";
import { SectionModel } from "../../utils/model_helper";
import "./style.css";
import { emitNotification } from "../../utils/emitNotification";

const AttractionsPage = () => {
	const accessToken = useSelector((state) => state.auth.accessToken);

	const [attractionLots, setAttractionLots] = useState([]);
	const [attractions, setAttractions] = useState([]);
	const [selectedLotId, setSelectedLotId] = useState(0);

	useEffect(() => {
		const fetchAttractions = async () => {
			try {
				const lotId = selectedLotId === 0 ? null : selectedLotId;
				const attrResponse = await getAttractions(accessToken, lotId);
				setAttractions(attrResponse.data.attractions);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};
		fetchAttractions();
	}, [selectedLotId, accessToken]);

	useEffect(() => {
		const fetchLotSections = async () => {
			try {
				const lotResponse = await getLotSections(accessToken, null);
				const lotSections = lotResponse.data.lotSections;
				lotSections.push({
					lot_section_no: 0,
					lot_section_name: "All",
				});
				setAttractionLots(lotResponse.data.lotSections);
			} catch (error) {
				emitNotification("error", error.response.data.message);
			}
		};
		fetchLotSections();
	}, [accessToken]);

	return (
		<div>
			<Header />
			<div className="attractions-container">
				<div className="filter">
					<SectionFilter
						filterName="Lot Section"
						filterItems={attractionLots.map(
							(lot) =>
								new SectionModel(
									lot.lot_section_no,
									lot.lot_section_name
								)
						)}
						handleItemClick={(lot_id) => {
							setSelectedLotId(lot_id);
						}}
					/>
				</div>
				<AttractionList attractions={attractions} />
			</div>
		</div>
	);
};

export default AttractionsPage;
