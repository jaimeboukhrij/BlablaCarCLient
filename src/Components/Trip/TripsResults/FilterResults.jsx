import React, { useState } from "react";
import SortBy from "./SortBy";
import TimeDeparture from "./TimeDeparture";
import { Col } from "react-bootstrap";
import Services from "./Services";



const FilterResults = ({ setResultSortBy, setSelectedTimeDeparture }) => {

    return (
        <Col md={{ span: 4, offset: 1 }} className="filters">
            <SortBy setResultSortBy={setResultSortBy} />
            <TimeDeparture setSelectedTimeDeparture={setSelectedTimeDeparture} />
            <Services setSelectedTimeDeparture={setSelectedTimeDeparture} />
        </Col>
    );
}

export default FilterResults;
