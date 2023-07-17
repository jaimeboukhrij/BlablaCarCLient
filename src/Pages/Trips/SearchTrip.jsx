import React, { useState, useEffect, useRef } from "react"
import bg from "../../assets/images/homebg.jpg"
import googleServer from "../../services/GoogleServer.services"
import { useNavigate } from "react-router-dom"
import tripService from "../../services/Trip.services"

const SearchTrip = () => {
    const [showOrigin, setOrigin] = useState([])
    const [showDestination, setDestination] = useState([])
    const [showPassengers, setPassengers] = useState(1)
    const [isPassengersVisible, setPassengersVisible] = useState(false)
    const passengersRef = useRef(null)
    const [tripData, setTripData] = useState({
        origin: "",
        originId: "",
        destination: "",
        destinationId: "",
        passengers: 1,
        date: new Date().toISOString().split("T")[0],
        hour: ""
    })

    const navigate = useNavigate()

    const chevron = <box-icon name="chevron-right" size="2em" color="grey"></box-icon>
    const minus = <box-icon name="minus-circle" color="#0a8ec2"></box-icon>
    const plus = <box-icon name="plus-circle" color="#0a8ec2"></box-icon>

    const handleChangeOrigin = (e) => {
        const { value } = e.target
        setTripData({ ...tripData, origin: value })
        value
            ? googleServer.autocomplete(value).then(({ data }) => {
                setOrigin(data.splice(0, 4))
            })
            : setOrigin([])
    }

    const handleChangeDestination = (e) => {
        const { value } = e.target
        setTripData({ ...tripData, destination: value })

        value
            ? googleServer.autocomplete(value).then(({ data }) => {
                setDestination(data.splice(0, 4))
            })
            : setDestination([])
    }

    const handlePassengersClick = () => {
        setPassengersVisible(true)
    }

    const handleOutsideClick = (event) => {
        const originElement = document.querySelector(".origin")
        const destinationElement = document.querySelector(".destination")
        const passengersElement = document.querySelector(".passengers")

        const isOriginVisible = originElement && originElement.contains(event.target)
        const isDestinationVisible = destinationElement && destinationElement.contains(event.target)
        const isPassengersVisible = passengersElement && passengersElement.contains(event.target)

        if (!isOriginVisible && !isDestinationVisible && !isPassengersVisible) {
            setOrigin([])
            setDestination([])
            setPassengersVisible(false)
        }
    }

    const handleMinusClick = (event) => {
        event.stopPropagation()
        if (showPassengers > 1) {
            setPassengers(showPassengers - 1)
            setTripData({ ...tripData, passengers: (showPassengers - 1) })

        }
    }

    const handlePlusClick = (event) => {
        event.stopPropagation()
        if (showPassengers < 8) {
            setPassengers(showPassengers + 1)
            setTripData({ ...tripData, passengers: (showPassengers + 1) })
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [showOrigin, showDestination])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { origin, destination, date, originId, destinationId, passengers } = tripData
        navigate(`/${origin}/${destination}/${date}/${originId}/${destinationId}/${passengers}`)

    }



    return (
        <header className="searchTripLink" >
            <h1>¿A dónde quieres ir?</h1>
            <form className="input-wrapper" >
                <input
                    type="text"
                    name="origin"
                    className="input"
                    placeholder="Origen"
                    onChange={handleChangeOrigin}
                    onClick={handleChangeOrigin}
                    value={tripData.origin}

                />
                <input
                    type="text"
                    placeholder="Destino"
                    name="destination"
                    className="input"
                    onChange={handleChangeDestination}
                    onClick={handleChangeDestination}
                    value={tripData.destination}
                />
                <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split("T")[0]}
                    max="2023-12-31"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                />
                <input
                    type="text"
                    name="passengers"
                    value={`Pasajeros: ${showPassengers}`}
                    className="input"
                    readOnly
                    onClick={handlePassengersClick}
                />
                <input type="submit" value={"Buscar"} name="text" className="input" onClick={handleSubmit} />
            </form>

            {showOrigin.length > 0 && (
                <div className="origin">
                    {showOrigin.map((elem) => {
                        return (
                            <div key={elem.place_id} className="eachOrigin"
                                onClick={() => setTripData({ ...tripData, origin: elem.structured_formatting.main_text, originId: elem.place_id })}>
                                <h6>{elem.structured_formatting.main_text}</h6>
                                <span>{chevron}</span>
                            </div>
                        )
                    })}
                </div>
            )}

            {showDestination.length > 0 && (
                <div className="destination">
                    {showDestination.map((elem) => {
                        return (
                            <div key={elem.place_id} className="eachOrigin"
                                onClick={() => setTripData({ ...tripData, destination: elem.structured_formatting.main_text, destinationId: elem.place_id })}>
                                <h6>{elem.structured_formatting.main_text}</h6>
                                <span>{chevron}</span>
                            </div>
                        )
                    })}
                </div>
            )}

            {isPassengersVisible && (
                <div ref={passengersRef} className="passengers">
                    <h6>Pasajero</h6>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="minus" onClick={handleMinusClick}>
                            {minus}
                        </span>
                        <span>{showPassengers}</span>
                        <span className="plus" onClick={handlePlusClick}>
                            {plus}
                        </span>
                    </div>
                </div>
            )}
        </header>
    )
}

export default SearchTrip
