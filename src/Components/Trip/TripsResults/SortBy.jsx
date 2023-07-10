import { Col, Form } from "react-bootstrap";



const SortBy = () => {

    const time = <box-icon name='time-five' size="1.4em"></box-icon>
    const timeSolid = <box-icon type="solid" name='time'  ></box-icon>
    const coin = <box-icon type="solid" name='coin' ></box-icon>
    const coinSolid = <box-icon type="solid" name='coin-stack' ></box-icon>

    return (
        <section className="sortBy">

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6%" }}>
                <h4 style={{ fontWeight: "bold" }}>Ordenar por</h4>
                <p style={{ fontSize: "1em", color: "#00AFF5", fontWeight: "bold", cursor: "pointer" }}>Borrar todo</p>
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{time}</span>
                    <h5>Salida mas temprana</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="radio"
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{timeSolid}</span>
                    <h5>Salida mas tardia</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="radio"
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{coin}</span>
                    <h5>Precio más bajo</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="radio"
                />
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{coinSolid}</span>
                    <h5>Precio más alto</h5>

                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="radio"
                />
            </div>

            <div className="separation"></div>
        </section>
    )
}


export default SortBy