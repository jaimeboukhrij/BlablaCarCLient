import { Col, Form } from "react-bootstrap";



const Services = () => {

    const check = <box-icon name='check-shield' type='solid' color='#00aff5' ></box-icon>
    const userplus = <box-icon name='user-plus'></box-icon>
    const smoke = <box-icon type='solid' name='hot'></box-icon>
    const dog = <box-icon type='solid' name='dog'></box-icon>

    return (
        <section className="sortBy">

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6%" }}>
                <h4 style={{ fontWeight: "bold" }}>Servicios</h4>
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{check}</span>
                    <h5>Perfil Verificado</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"
                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{userplus}</span>
                    <h5>Max. 2 personas atrás</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"

                />
            </div>
            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{smoke}</span>
                    <h5>Se permite fumar</h5>
                </div>
                <Form.Check
                    reverse
                    name="group1"
                    type="checkbox"

                />
            </div>

            <div className="eachSort">
                <div style={{ display: "flex", width: "80%" }}>
                    <span>{dog}</span>
                    <h5>Se admiten mascotas</h5>

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


export default Services