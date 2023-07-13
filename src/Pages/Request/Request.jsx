import { useEffect, useState } from "react";
import "./Request.css"
import Modal from 'react-bootstrap/Modal';



const Request = ({ showModal }) => {




    useEffect(() => {
        setShow(true)
    }, [showModal]);

    useEffect(() => {
        setShow(false)
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="yourTripsRequest"
            size="lg"
        >

            <Modal.Body>
                I will not close if you click outside me. Don not even try to press
                escape key.
            </Modal.Body>

        </Modal>
    )
}


export default Request