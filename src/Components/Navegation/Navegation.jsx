import "./Navegation.css"
import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import blablaLogo from "../../assets/images/blablaLogo.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'boxicons'
import { AuthContext } from "../../contexts/auth.context";
import Modal from 'react-bootstrap/Modal';
import tripService from "../../services/Trip.services";
import Loading from "../Others/Loading/Loading";
import formatDate from "../../utils/FormatDate"
import { Toast } from 'react-bootstrap'


const Navegation = () => {
    const { user, logout } = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const [tripsData, setTripsData] = useState()
    const [showNewData, setNewData] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState()
    const [toastBg, setToastBg] = useState()



    const search = <box-icon name='search' color="#00AFF5"></box-icon>
    const plus = <box-icon name='plus-circle' color="#00AFF5"></box-icon>
    const userBox = <box-icon name='user' type='solid' color='#00AFF5' ></box-icon>
    const check = <box-icon name='check-circle' type='solid' color='#16e888' size="3em"></box-icon>
    const notCheck = <box-icon name='x-circle' type='solid' rotate='90' color='#e81616' size="3em" ></box-icon>


    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeToast = () => setShowToast(false)

    useEffect(() => {

        if (user) {
            const { _id: idUSer } = user
            tripService
                .getOwnerTrips(idUSer)
                .then(({ data }) => {
                    const newData = data.filter((elem) => elem.request.length > 0)
                    setTripsData(newData)
                })
                .catch(e => console.log(e))

        }
    }, [show, showNewData])

    const handleNotCheck = (data) => {
        tripService
            .tripRequest(data)
            .then(() => setNewData(!showNewData))
            .catch(e => console.log(e))

        setToastMessage("Solicitud rechazada")
        setToastBg("danger")
        setShowToast(true)
    }




    const handleCheck = (data) => {
        tripService
            .tripPassengers(data)
            .then(() => setNewData(!showNewData))
            .catch(e => console.log(e))

        setToastMessage("Solicitud aceptada")
        setToastBg("success")
        setShowToast(true)

    }


    return (
        <div className="prueba">
            <Navbar data-theme="dark">
                <Container>
                    <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        {<img src={blablaLogo}></img>}</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => navigate("/buscarviaje")}>
                            <span>{search} </span> Buscar
                        </Nav.Link>

                        <Nav.Link onClick={() => navigate("/crearviaje")}>
                            <span> {plus}</span> Publicar un viaje
                        </Nav.Link>

                        {user
                            ? <NavDropdown title={user ? <img src={user.avatar}></img> : userBox} id="navbarScrollingDropdown" style={{ marginTop: "2%" }}>
                                <NavDropdown.Item onClick={() => navigate("/miperfil")}>Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/tusviajes")}>Tus viajes</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShow}>Peticiones de viaje</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Cerrar Sesion</NavDropdown.Item>
                            </NavDropdown>

                            : <NavDropdown title={userBox} id="navbarScrollingDropdown" style={{ marginTop: "2%" }}>
                                <NavDropdown.Item onClick={() => navigate("/login")}>Iniciar Sesion</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/signup")}>Registrarse</NavDropdown.Item>

                            </NavDropdown>

                        }


                    </Nav>
                </Container>
            </Navbar>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="yourTripsRequest"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Solicitudes para viajar contigo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {

                        tripsData
                            ? tripsData.map(({ origin, destination, _id, date, request, passengers, passengersIds }, index) => {
                                const idTrip = _id

                                return (

                                    <div className="eachTripRequest" key={_id}>
                                        <h5 style={{ marginBottom: "5%" }}> De <span>{origin.name} </span>
                                            a <span>{destination.name}</span>
                                            <span>{formatDate(date)}</span>
                                        </h5>
                                        {
                                            request.map((elem, index) => {
                                                const { _id: idUser } = elem
                                                return (
                                                    <div className="eachRequest" key={index}>
                                                        <div style={{ cursor: "pointer" }}>
                                                            <img src={elem.avatar} alt="" />
                                                            <span style={{ fontSize: "1.2em" }}>{elem.firstName} {elem.lastName}</span>
                                                        </div>
                                                        <div style={{ paddingTop: "3%" }}>
                                                            <span onClick={() => handleNotCheck({ idTrip, idUser })}
                                                                style={{ cursor: "pointer" }} >{notCheck}</span>

                                                            <span onClick={() => {
                                                                if (passengersIds.length < passengers) { handleCheck({ idTrip, idUser }) }
                                                                else {
                                                                    setShowToast(true)
                                                                    setToastMessage("No le quedan plazas disponibles")
                                                                    setToastBg("danger")

                                                                }
                                                            }}

                                                                style={{ cursor: "pointer" }}>{check}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                )
                            })

                            : <Loading />
                    }
                </Modal.Body>

            </Modal>

            <Toast onClose={closeToast}
                bg={toastBg}
                show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 10, right: 10, zIndex: "999" }}>
                <Toast.Header>
                    <strong className="me-auto">{toastMessage}</strong>
                </Toast.Header>
            </Toast>
        </div >
    )
}

export default Navegation