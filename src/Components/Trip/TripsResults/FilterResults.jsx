import React, { useState } from "react";
import SortBy from "./SortBy";
import TimeDeparture from "./TimeDeparture";
import { Col } from "react-bootstrap";
import Services from "./Services";



const FilterResults = ({ setResultSortBy, setSelectedTimeDeparture, setClearAll, clearAll, selectedTimeDeparture }) => {

    return (
        <Col md={{ span: 4, offset: 1 }} className="filters">
            <SortBy setResultSortBy={setResultSortBy} setClearAll={setClearAll} clearAll={clearAll} />
            <TimeDeparture setSelectedTimeDeparture={setSelectedTimeDeparture} />
            <Services setSelectedTimeDeparture={setSelectedTimeDeparture} setClearAll={setClearAll}
                clearAll={clearAll} selectedTimeDeparture={selectedTimeDeparture} />
        </Col>
    );
}

export default FilterResults;
