import { Col, Form } from "react-bootstrap";



const TimeDeparture = () => {

    const time = <box-icon name='time-five' ></box-icon>

    const timeSolid = <box-icon type="solid" name='time' ></box-icon>
    const coin = <box-icon type="solid" name='coin' ></box-icon>
    const coinSolid = <box-icon type="solid" name='coin-stack' ></box-icon>

    return (
        <section className="TimeDeparture">

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6%" }}>
                <h4 style={{ fontWeight: "bold" }}>Hora de salida</h4>
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", justifyContent: "left", width: "80%" }}>
                    <h5>Antes de las 06:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>06:00h -12:00h</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"

                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>12:00h -18:00h</h5>

                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"

                />
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <h5>Después de las 18:00h</h5>

                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"

                />
            </div>

            <div className="separation"></div>
        </section>
    )
}


export default TimeDeparture