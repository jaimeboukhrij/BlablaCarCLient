import "./Trips.css"
import { useEffect, useState, } from "react"
import { useParams } from "react-router-dom"

import tripService from "../../services/Trip.services"
import TripsResult from "../../Components/Trip/TripsResults/TripsResult"
import FilterResults from "../../Components/Trip/TripsResults/FilterResults"
import { Row } from "react-bootstrap"


const TripsResults = () => {

    const [tripsBringResults, setTripsBringResults] = useState()


    const { origen, idOrigen, destino, idDestino, date } = useParams()
    const tripData = {
        origin: origen,
        originId: idOrigen,
        destination: destino,
        destinationId: idDestino,
        date: date
    }


    useEffect(() => {
        tripService
            .getTrip({ tripData })
            .then(({ data }) => setTripsBringResults(data))
    }, [])



    return (
        <Row className="tripResults">
            <FilterResults />
            <TripsResult tripsBringResults={tripsBringResults} />
        </Row>
    )
}


export default TripsResults