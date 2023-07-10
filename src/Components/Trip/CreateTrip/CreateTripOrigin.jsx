
import Button from "react-bootstrap/esm/Button"
import { Col, Form, Row } from "react-bootstrap"
import { useLoadScript } from "@react-google-maps/api";
import googleServer from "../../../services/GoogleServer.services";
import Loading from "../../Others/Loading/Loading";
import { useState } from "react";
import Map from "../../Others/Map/Map";
import getCoordinates from "../../../utils/getCoordinates";

const CreateTripOrigin = ({ tripData, setTripData, setSection }) => {
    const [Origin, setOrigin] = useState()
    const [CoordinatesOrigin, setCoordinatesOrigin] = useState()
    const [originId, setOriginId] = useState()


    const chevron = <box-icon name="chevron-right" size="2em" color="grey"></box-icon>
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBtc80oZ9lOnbwQODIRr0lG8MOlhxpXb94", })


    const changeOrigin = e => {
        const { value } = e.target
        setTripData({ ...tripData, origin: value })

        value
            ? googleServer.autocomplete(value).then(({ data }) => {
                setOrigin(data)
            })
            : setOrigin()
    }


    const handleSubmit = () => {
        setSection(2)
        setTripData({ ...tripData, originId: originId })
    }

    return (
        <Row>
            <Col md={{ span: 6, offset: 0 }}>

                <div className="createTrip">

                    <h2>¿Desde dónde sales?</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Escribe la dirección completa"
                                value={tripData.origin}
                                onChange={changeOrigin} />

                        </Form.Group>


                    </Form>

                    {Origin && (
                        <div className="origin">
                            {Origin.map((elem) => {
                                return (
                                    <div key={elem.place_id} className="eachOrigin"
                                        onClick={() => {
                                            getCoordinates(elem.place_id).then(res => setCoordinatesOrigin(res))
                                            setTripData({ ...tripData, origin: elem.structured_formatting.main_text, originId: elem.place_id })
                                            setOriginId(elem.place_id)
                                        }}>
                                        <h6>{elem.structured_formatting.main_text}</h6>
                                        <span>{chevron}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {CoordinatesOrigin &&
                        <Button onClick={handleSubmit}  >
                            Continuar
                        </Button>
                    }
                </div>
            </Col>

            <Col md={{ span: 6, offset: 0 }}>
                {
                    isLoaded
                        ? <Map Coordinates={CoordinatesOrigin} />
                        : <Loading />
                }
            </Col>


        </Row>

    )

}


export default CreateTripOrigin