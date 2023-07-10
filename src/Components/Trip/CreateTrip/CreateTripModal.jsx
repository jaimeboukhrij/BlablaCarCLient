import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import tripService from '../../../services/Trip.services';
import { AuthContext } from '../../../contexts/auth.context';
import { useNavigate } from "react-router-dom"

const CreateTripModal = ({ showModal, handleClose, tripData }) => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    console.log(user)

    const handleSubmit = () => {
        handleClose
        tripService
            .save(tripData)
            .then(() => navigate("/"))

    }

    return (
        <>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body className='modalCreateTrip'>

                    <h3>Detalles del Viaje</h3>
                    <hr />
                    <div className='body'>
                        <h6>Salida: <span>{tripData.origin}</span></h6>
                        <h6>Destino: <span>{tripData.destination}</span></h6>
                        <h6>Fecha: <span>{tripData.date}</span></h6>
                        <h6>Hora de salida: <span>{tripData.hour}h</span></h6>
                        <h6>Pasajeros: <span>{tripData.passengers}</span></h6>
                        <h6>Precio: <span>{tripData.price}€</span></h6>
                    </div>





                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: "#0497d1", border: "none" }} onClick={handleSubmit}>
                        Confirmar viaje
                    </Button>
                    <Button style={{ backgroundColor: "red", border: "none" }} onClick={handleClose}>
                        Editar viaje
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateTripModal;