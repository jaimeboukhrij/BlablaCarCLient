import { useContext, useEffect, useState } from "react"
import tripService from "../../services/Trip.services"
import { useParams } from "react-router-dom"
import getCoordinates from "../../utils/getCoordinates"
import DetailsRouteMap from "../../Components/Others/Map/DetailsRouteMap"
import Loading from "../../Components/Others/Loading/Loading"
import { AuthContext } from "../../contexts/auth.context"
import { Button, Toast } from 'react-bootstrap'
import formatDate from "../../utils/FormatDate"
import isCurrentDayLaterThan from "../../utils/isCurrentDayLaterThan"
import Reviews from "../../Components/Trip/Reviews/Reviews"



const DetailsTrip = () => {

    const [tripData, setTripData] = useState()
    const [coordinates_origin, setCoordinates_origin] = useState()
    const [coordinates_destination, setCoordinates_destination] = useState()
    const [showButton, setButton] = useState()
    const [showToast, setShowToast] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showPerson, setPerson] = useState();


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



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
                if (data?.request.includes(user?._id)) {
                    setButton(false)
                }
                else if (data?.passengersIds.some(obj => obj._id == user?._id)) { setButton("display") }
                else setButton(true)
            })
            .catch(e => console.log(e))
    }, [showModal, showPerson])






    const handleButton = () => {
        if (user && tripData) {
            const { _id: idUser } = user
            const { _id: idTrip } = tripData

            tripService
                .tripRequest({ idUser, idTrip })
                .then(() => setButton(!showButton))
                .catch(e => console.log(e))

        }
        showButton && setShowToast(true)
    };


    const closeToast = () => setShowToast(false)


    return (
        <main className="detailsTrip">
            <header>

                {
                    (coordinates_origin && coordinates_destination)

                        ? <DetailsRouteMap coordinates_origin={coordinates_origin} coordinates_destination={coordinates_destination} ></DetailsRouteMap>
                        : <Loading />
                }


            </header>

            <section className="section2">
                <div className="details">
                    <h3>Detalles del Viaje</h3>
                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "8%", marginBottom: "5%" }}>
                        <div style={{ textAlign: "left" }}>
                            <p><span>Origen: </span>{tripData?.origin.name}</p>
                            <p><span>Destino: </span>{tripData?.destination.name}</p>
                            <p><span>Precio: </span>{tripData?.price}€</p>
                            <p><span>Plazas restantes: </span>{tripData?.passengers - tripData?.passengersIds.length}</p>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <p><span>Fecha del viaje: </span>{formatDate(tripData?.date)}</p>
                            <p><span>Hora de salida: </span>{tripData?.hourDeparture}</p>
                            <p><span>Duración del viaje: </span>{tripData?.duration}</p>
                        </div>

                    </div>
                    <h3>Conductor</h3>
                    <div style={{ display: "flex", marginLeft: "5%", marginTop: "5%" }} className="driver">
                        <img src={tripData?.owner.avatar} alt="" />
                        <span style={{ display: "flex", flexDirection: "column" }}>
                            <span>{tripData?.owner.firstName} {tripData?.owner.lastName}</span>
                            <span style={{ color: "gray", textAlign: "left" }}>4.5 {"\u2605"}</span>

                        </span>

                    </div>

                </div>
                <div className="pass">
                    <h3>Pasajeros</h3>
                    <div className="passengersDetailsTrip">
                        {
                            tripData
                                ? tripData.passengersIds.map((elem) => {
                                    return (
                                        <div key={elem._id} className="eachPass">
                                            <img src={elem.avatar} alt="" />
                                            <span style={{ display: "flex", flexDirection: "column" }}>
                                                <span>{elem.firstName} {elem.lastName}</span>
                                                <span style={{ color: "gray", textAlign: "left" }}>4.5 {"\u2605"}</span>

                                            </span>

                                        </div>
                                    )
                                })
                                : <Loading />
                        }
                    </div>

                    {
                        isCurrentDayLaterThan(tripData?.date) &&
                        <Button onClick={handleShow} style={{ marginTop: "5%" }}>Escribe tu reseña</Button>
                    }

                    <Reviews handleClose={handleClose} showModal={showModal} tripData={tripData} setTripData={setTripData}
                        showPerson={showPerson} setPerson={setPerson}
                    />
                </div>
            </section>

            {
                ((tripData?.owner._id != user?._id) && showButton != "display") &&
                <section className="section3" >
                    {
                        showButton
                            ? <button onClick={handleButton}> Enviar solicitud</button>
                            : <button style={{ backgroundColor: "red" }} onClick={handleButton}> Eliminar Solicitud</button>
                    }
                </section>}


            <Toast onClose={closeToast}
                bg="success"
                show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 10, right: 10 }}>
                <Toast.Header>
                    <strong className="me-auto">Solicitud de viaje enviada</strong>
                </Toast.Header>

            </Toast>
        </main >
    )
}


export default DetailsTrip