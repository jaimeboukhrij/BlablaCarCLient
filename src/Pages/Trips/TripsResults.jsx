import "./Trips.css"
import { useEffect, useState, } from "react"
import { useParams } from "react-router-dom"

import tripService from "../../services/Trip.services"
import TripsResult from "../../Components/Trip/TripsResults/TripsResult"
import FilterResults from "../../Components/Trip/TripsResults/FilterResults"
import { Row } from "react-bootstrap"
import SortArrByTimeEarlier from "../../utils/SortArrByTimeEarlier"
import SortArrByTimeLater from "../../utils/SortArrByTimeLater"
import SortTimeDeparture from "../../utils/SortTimeDeparture"


const TripsResults = () => {

    const [tripsBringResults, setTripsBringResults] = useState()
    const [resultSortBy, setResultSortBy] = useState("earlier")
    const [selectedTimeDeparture, setSelectedTimeDeparture] = useState([]);
    const [clearAll, setClearAll] = useState(false)
    const { origen, idOrigen, destino, idDestino, date, passengers } = useParams()
    const tripData = {
        origin: origen,
        originId: idOrigen,
        destination: destino,
        destinationId: idDestino,
        date: date,
        passengers: passengers
    }




    useEffect(() => {
        setResultSortBy("earlier")
        tripService
            .getTrip({ tripData })
            .then(({ data }) => {
                setTripsBringResults(SortArrByTimeEarlier(data))
            })
            .catch(e => console.log(e))

    }, [clearAll]);

    useEffect(() => {
        selectedTimeDeparture.length > 0 ?
            tripService
                .getTrip({ tripData })
                .then(({ data }) => (SortTimeDeparture(selectedTimeDeparture, data)))
                .then((data) => {
                    resultSortBy == "earlier" && setTripsBringResults(SortArrByTimeEarlier(data))
                    resultSortBy == "later" && setTripsBringResults(SortArrByTimeLater(data))
                    resultSortBy == "cheaper" && setTripsBringResults(data.sort((a, b) => a.price - b.price))
                    resultSortBy == "expensive" && setTripsBringResults(data.sort((a, b) => b.price - a.price))
                })
                .catch(e => console.log(e))

            : tripService
                .getTrip({ tripData })
                .then(({ data }) => {
                    resultSortBy == "earlier" && setTripsBringResults(SortArrByTimeEarlier(data))
                    resultSortBy == "later" && setTripsBringResults(SortArrByTimeLater(data))
                    resultSortBy == "cheaper" && setTripsBringResults(data.sort((a, b) => a.price - b.price))
                    resultSortBy == "expensive" && setTripsBringResults(data.sort((a, b) => b.price - a.price))
                })
                .catch(e => console.log(e))
    }, [resultSortBy, selectedTimeDeparture])




    return (
        <Row className="tripResults">
            <FilterResults setTripsBringResults={setTripsBringResults} setResultSortBy={setResultSortBy}
                setSelectedTimeDeparture={setSelectedTimeDeparture} selectedTimeDeparture={selectedTimeDeparture}
                setClearAll={setClearAll} clearAll={clearAll}
            />
            <TripsResult tripsBringResults={tripsBringResults} />
        </Row>
    )
}


export default TripsResults



