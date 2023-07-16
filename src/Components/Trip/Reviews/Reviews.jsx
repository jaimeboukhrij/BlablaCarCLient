import "./Reviews.css";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../contexts/auth.context";
import { Form } from "react-bootstrap";
import tripService from "../../../services/Trip.services";
import getShowList from "../../../utils/getShowList";

const Reviews = ({ showModal, handleClose, setTripData, tripData, showPerson, setPerson }) => {
    const [rating, setRating] = useState(0)
    const [showText, setText] = useState()
    const [showList, setlist] = useState()

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setlist(getShowList(tripData, user))
        setPerson()
    }, [showModal])

    useEffect(() => {
        setlist(getShowList(tripData, user))

    }, [tripData]);

    const handleChange = (event) => {
        let filerPas
        const selectedOption = event.target.value;
        if (tripData.owner._id == selectedOption) { setPerson(tripData.owner) }
        else {
            filerPas = tripData.passengersIds.filter((elem) => elem._id == selectedOption)
            setPerson(...filerPas)
        }

        setText("")
    }

    const handleChangeStar = (e) => {
        const { value } = e.target
        setRating(value)
    }

    const handleChangeText = (e) => {
        const { value } = e.target;
        if (value?.length <= 300) {
            setText(value);
        }
    }

    const handleSubmit = () => {
        if (user) {
            const { _id: idUser } = user
            const data = {
                inf: { score: rating, text: showText, owner: idUser, to: showPerson?._id },
                id: tripData?._id
            }

            tripService
                .saveReviews(data)
                .then(() => {
                    setPerson()

                })
        }

    }


    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="reviews"
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Escribe tus reseñas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select size="lg" placeholder="Selecciona el pasajero" onChange={handleChange}>
                    <option>Selecciona el pasajero</option>
                    {showList?.map(({ avatar, firstName, lastName, _id }) => {
                        return (
                            <option key={_id} value={_id}>
                                <div>
                                    <h6>
                                        {firstName} {lastName}
                                    </h6>
                                </div>
                            </option>
                        );
                    })}
                </Form.Select>
                {showPerson && (
                    <section className="eachOption">
                        <div className="profile">
                            <img src={showPerson.avatar} alt="" />
                            <div class="rating">
                                <input type="radio" name="star" value={5} onChange={handleChangeStar} id="star01" /><label for="star01"></label>
                                <input type="radio" name="star" value={4} onChange={handleChangeStar} id="star02" /><label for="star02"></label>
                                <input type="radio" name="star" value={3} onChange={handleChangeStar} id="star03" /><label for="star03"></label>
                                <input type="radio" name="star" value={2} onChange={handleChangeStar} id="star04" /><label for="star04"></label>
                                <input type="radio" name="star" value={1} onChange={handleChangeStar} id="star05" /><label for="star05"></label>
                            </div>
                        </div>
                        <Form.Group className="text" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" value={showText} onChange={handleChangeText} />
                            <p style={{ margin: "0 auto", marginTop: "2%" }}>{`${showText?.length} / 300 letras`}</p>
                        </Form.Group>
                    </section>
                )}

                {showPerson && <button onClick={handleSubmit}>Guardar reseña</button>}
            </Modal.Body>
        </Modal>
    );
};

export default Reviews;
