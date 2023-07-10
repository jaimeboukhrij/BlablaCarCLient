import Button from "react-bootstrap/esm/Button"
import { Col, Form, Row } from "react-bootstrap"
import { useLoadScript } from "@react-google-maps/api";
import googleServer from "../../../services/GoogleServer.services";
import Loading from "../../Others/Loading/Loading";
import { useState } from "react";
import Map from "../../Others/Map/Map";
import getCoordinates from "../../../utils/getCoordinates";

const CreateTripDestination = ({ tripData, setTripData, setSection }) => {
    const [Destination, setDestination] = useState()
    const [CoordinatesDestination, setCoordinatesDestination] = useState()
    const [DestinationId, setDestinationId] = useState()


    const chevron = <box-icon name="chevron-right" size="2em" color="grey"></box-icon>
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBtc80oZ9lOnbwQODIRr0lG8MOlhxpXb94", })


    const changeDestination = e => {
        const { value } = e.target
        setTripData({ ...tripData, destination: value })

        value
            ? googleServer.autocomplete(value).then(({ data }) => {
                setDestination(data)
            })
            : setDestination()
    }


    const handleSubmit = () => {
        setSection(3)
        setTripData({ ...tripData, destinationId: DestinationId })
    }

    return (
        <Row>
            <Col md={{ span: 6, offset: 0 }}>

                <div className="createTrip">

                    <h2>¿Cuál es tu destino?</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Escribe la dirección completa"
                                value={tripData.destination}
                                onChange={changeDestination} />

                        </Form.Group>


                    </Form>

                    {Destination && (
                        <div className="origin">
                            {Destination.map((elem) => {
                                return (
                                    <div key={elem.place_id} className="eachOrigin"
                                        onClick={() => {
                                            getCoordinates(elem.place_id).then(res => setCoordinatesDestination(res))
                                            setTripData({ ...tripData, destination: elem.structured_formatting.main_text, destinationId: elem.place_id })
                                            setDestinationId(elem.place_id)
                                        }}>
                                        <h6>{elem.structured_formatting.main_text}</h6>
                                        <span>{chevron}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {CoordinatesDestination &&
                        <>
                            <Button onClick={handleSubmit}  >
                                Continuar
                            </Button>

                        </>
                    }
                    <Button onClick={() => setSection(1)} style={{ background: "red" }}  >
                        Volver atras
                    </Button>
                </div>
            </Col>

            <Col md={{ span: 6, offset: 0 }}>
                {
                    isLoaded
                        ? <Map Coordinates={CoordinatesDestination} />
                        : <Loading />
                }
            </Col>


        </Row>

    )

}


export default CreateTripDestination