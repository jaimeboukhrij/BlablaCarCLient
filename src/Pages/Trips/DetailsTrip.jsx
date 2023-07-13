import { useContext, useEffect, useState } from "react"
import RouteMap from "../../Components/Others/Map/RouteMap"
import tripService from "../../services/Trip.services"
import { useParams } from "react-router-dom"
import getCoordinates from "../../utils/getCoordinates"
import DetailsRouteMap from "../../Components/Others/Map/DetailsRouteMap"
import Loading from "../../Components/Others/Loading/Loading"
import { AuthContext } from "../../contexts/auth.context"


const DetailsTrip = () => {

    const [tripData, setTripData] = useState()
    const [coordinates_origin, setCoordinates_origin] = useState()
    const [coordinates_destination, setCoordinates_destination] = useState()
    const [showButton, setButton] = useState()


    const { idViaje: idTrip } = useParams()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        tripService
            .getOneTrip(idTrip)
            .then(({ data }) => {
                getCoordinates(data.origin.id).then((data) => setCoordinates_origin(data))
                getCoordinates(data.destination.id).then((data) => setCoordinates_destination(data))
                setTripData(data)
            })
            .catch(e => console.log(e))

        tripService
            .getOneTrip(idTrip)
            .then(({ data }) => {
                data?.request.includes(user?.id)
                    ? setButton(false)
                    : setButton(true)
            })
            .catch(e => console.log(e))
    }, [])





    const handleButton = () => {
        if (user && tripData) {
            const { _id: idUser } = user
            const { _id: idTrip } = tripData

            tripService
                .tripRequest({ idUser, idTrip })
                .then(() => setButton(!showButton))
                .catch(e => console.log(e))

        }
    };


    return (
        <main className="detailsTrip">
            <header>

                {
                    (coordinates_origin && coordinates_destination)

                        ? <DetailsRouteMap coordinates_origin={coordinates_origin} coordinates_destination={coordinates_destination} ></DetailsRouteMap>
                        : <Loading />
                }


            </header>

            {
                (tripData?.owner != user?._id) &&
                <section className="section3" >
                    {
                        showButton
                            ? <button onClick={handleButton}> Enviar solicitud</button>
                            : <button style={{ backgroundColor: "red" }} onClick={handleButton}> Eliminar Solicitud</button>
                    }
                </section>}
        </main >
    )
}


export default DetailsTrip