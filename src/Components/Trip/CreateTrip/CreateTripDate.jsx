import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import RouteMap from "../../Others/Map/RouteMap"
import getCoordinates from "../../../utils/getCoordinates"
import CreateTripModal from "./CreateTripModal"

const CreateTripDate = ({ tripData, setTripData, setSection }) => {
    const [coordinates_origin, setCoordinates_origin] = useState()
    const [coordinates_destination, setCoordinates_destination] = useState()
    const [showPrice, setPrice] = useState(20)
    const [showPassengers, setPassengers] = useState(1)
    const [currentHour, setCurrentHour] = useState("")
    const [showModal, setShowModal] = useState(false)



    const today = new Date()
    const currentTime = today.toISOString().slice(0, 16)
    const minus = <box-icon name="minus-circle" color="#0a8ec2"></box-icon>
    const plus = <box-icon name="plus-circle" color="#0a8ec2"></box-icon>

    useEffect(() => {
        getCoordinates(tripData.originId).then((data) => setCoordinates_origin(data))
        getCoordinates(tripData.destinationId).then((data) => setCoordinates_destination(data))
    }, [])

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    const handleMinusClick = (event) => {
        if (showPrice > 1) {
            setPrice(showPrice - 1)
            setTripData({ ...tripData, price: showPrice - 1 })
        }
    }

    const handlePlusClick = (event) => {
        if (showPrice < 100) {
            setPrice(showPrice + 1)
            setTripData({ ...tripData, price: showPrice + 1 })
        }
    }

    const handleMinusClickPassenger = (event) => {
        if (showPassengers > 1) {
            setPassengers(showPassengers - 1)
            setTripData({ ...tripData, passengers: showPassengers - 1 })
        }
    }

    const handlePlusClickPassenger = (event) => {
        if (showPassengers < 5) {
            setPassengers(showPassengers + 1)
            setTripData({ ...tripData, passengers: showPassengers + 1 })
        }
    }

    const handleTimeChange = (event) => {
        setCurrentHour(event.target.value)
        setTripData({ ...tripData, hourDeparture: event.target.value })
    }

    useEffect(() => {
        const currentHour = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        setCurrentHour(currentHour)
        setTripData({ ...tripData, hour: currentHour })
    }, [])


    return (
        <Row>
            <Col md={6}>
                <div className="createTrip">
                    <Row>
                        <Col md={{ span: 8, offset: 1 }} style={{ marginTop: "2%" }}>
                            <h2 style={{ fontSize: "1.5em" }}>¿Cuál es tu día de salida?</h2>
                            <input
                                type="date"
                                id="timepicker"
                                min={new Date().toISOString().split("T")[0]}
                                max="2023-12-31"
                                defaultValue={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                            />
                        </Col>

                        <Col md={{ span: 8, offset: 1 }} style={{ marginTop: "8%" }}>
                            <h2 style={{ fontSize: "1.5em" }}>¿Cuál es tu hora de salida?</h2>
                            <input type="time" id="timepicker" value={currentHour} onChange={handleTimeChange} />
                        </Col>

                        <Col md={{ span: 8, offset: 1 }} style={{ marginTop: "8%" }}>
                            <h2 style={{ fontSize: "1.5em" }}>¿Cuál es el precio del viaje?</h2>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <span className="minus" style={{ cursor: "pointer" }} onClick={handleMinusClick}>
                                    {minus}
                                </span>
                                <span style={{ margin: "0 20px" }}>{showPrice} €</span>
                                <span className="plus" style={{ cursor: "pointer" }} onClick={handlePlusClick}>
                                    {plus}
                                </span>
                            </div>
                        </Col>

                        <Col md={{ span: 8, offset: 1 }} style={{ marginTop: "8%" }}>
                            <h2 style={{ fontSize: "1.5em" }}>¿Cuántos pasajeros quieres llevar?</h2>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <span className="minus" style={{ cursor: "pointer" }} onClick={handleMinusClickPassenger}>
                                    {minus}
                                </span>
                                <span style={{ margin: "0 20px" }}>{showPassengers}</span>
                                <span className="plus" style={{ cursor: "pointer" }} onClick={handlePlusClickPassenger}>
                                    {plus}
                                </span>
                            </div>
                        </Col>

                        <Col md={{ span: 8, offset: 2 }} style={{ marginTop: "5%" }}>
                            <Button onClick={handleShow}>Crear Viaje</Button>
                            <Button onClick={() => setSection(1)} style={{ background: "red" }}  >
                                Volver atras
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={6}>
                <RouteMap coordinates_origin={coordinates_origin} coordinates_destination={coordinates_destination}
                    tripData={tripData} setTripData={setTripData} />
            </Col>

            <CreateTripModal showModal={showModal} handleClose={handleClose} tripData={tripData} />


        </Row>
    )
}

export default CreateTripDate
