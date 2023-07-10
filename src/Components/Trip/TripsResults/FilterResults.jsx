import React from "react";
import SortBy from "./SortBy";
import TimeDeparture from "./TimeDeparture";
import { Col } from "react-bootstrap";
import Services from "./Services";



const FilterResults = () => {
    return (
        <Col md={{ span: 4, offset: 1 }} className="filters">
            <SortBy />
            <TimeDeparture />
            <Services />
        </Col>
    );
}

export default FilterResults;
