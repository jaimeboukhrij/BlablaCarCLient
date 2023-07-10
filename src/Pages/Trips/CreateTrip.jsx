import "./Trips.css"
import { useState } from "react"
import CreateTripOrigin from "../../Components/Trip/CreateTrip/CreateTripOrigin"
import CreateTripDestination from "../../Components/Trip/CreateTrip/CreateTripDestination"
import CreateTripDate from "../../Components/Trip/CreateTrip/CreateTripDate"

const CreateTrip = () => {
    const [section, setSection] = useState(1)
    const [tripData, setTripData] = useState({
        origin: "",
        originId: "",
        destination: "",
        destinationId: "",
        passengers: 1,
        date: new Date().toISOString().split("T")[0],
        price: 20,
        hourDeparture: `${new Date().getHours()}:${new Date().getMinutes()}`,
        duration: "",
        hourArrival: ""

    })

    return (
        <>
            {section == 1 && <CreateTripOrigin tripData={tripData} setTripData={setTripData} setSection={setSection} />}
            {section == 2 && <CreateTripDestination tripData={tripData} setTripData={setTripData} setSection={setSection} />}
            {section == 3 && <CreateTripDate tripData={tripData} setTripData={setTripData} setSection={setSection} />}
        </>
    )
}

export default CreateTrip