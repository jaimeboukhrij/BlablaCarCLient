import { useState } from "react";
import { Col, Form } from "react-bootstrap";

const TimeDeparture = ({ setSelectedTimeDeparture }) => {
    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedTimeDeparture((prevSelectedCheckboxes) => [...prevSelectedCheckboxes, checkboxValue]);
        } else {
            setSelectedTimeDeparture((prevSelectedCheckboxes) =>
                prevSelectedCheckboxes.filter((value) => value !== checkboxValue)
            );
        }
    };

    return (
        <section className="TimeDeparture">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6%" }}>
                <h4 style={{ fontWeight: "bold" }}>Hora de salida</h4>
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", justifyContent: "left", width: "80%" }}>
                    <h5>Antes de las 06:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                    value="-06:00"
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>06:00h - 12:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                    value="-12:00"
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>12:00h - 18:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                    value="-18:00"
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>Después de las 18:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                    value="+18:00"
                    onChange={handleCheckboxChange}
                />
            </div>

            <div className="separation"></div>

        </section>
    );
};

export default TimeDeparture;
