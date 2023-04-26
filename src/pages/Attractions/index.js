import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AttractionList from "../../components/AttractionList";
import Header from "../../components/Header";
import LotSectionFilter from "../../components/SectionFilter";
import { getAttractions, getLotSections } from "../../utils/api";

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
        alert(error.response.data.message);
      }
    };
    fetchAttractions();
  }, [selectedLotId]);

  useEffect(() => {
    const fetchLotSections = async () => {
      try {
        const lotResponse = await getLotSections(accessToken, null);
        const lotSections = lotResponse.data.lotSections;
        lotSections.push({ lot_section_no: 0, lot_section_name: "All" });
        setAttractionLots(lotResponse.data.lotSections);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchLotSections();
  }, []);

  return (
    <div>
      <Header />
      <LotSectionFilter
        attractionLots={attractionLots}
        selectedLots={selectedLotId}
        handleLotClick={(lot_id) => {
          setSelectedLotId(lot_id);
        }}
      />
      <AttractionList attractions={attractions}/>
    </div>
  );
};

export default AttractionsPage;
