import { useEffect } from "react";
import { Col, Form } from "react-bootstrap";



const Services = ({ setSelectedTimeDeparture, setClearAll, clearAll, selectedTimeDeparture }) => {

    const check = <box-icon name='check-shield' type='solid' color='#00aff5' ></box-icon>
    const userplus = <box-icon name='user-plus'></box-icon>
    const smoke = <box-icon type='solid' name='hot'></box-icon>
    const dog = <box-icon type='solid' name='dog'></box-icon>



    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedTimeDeparture((prevSelectedCheckboxes) => [...prevSelectedCheckboxes, checkboxValue]);
        } else {
            setSelectedTimeDeparture((prevSelectedCheckboxes) =>
                prevSelectedCheckboxes.filter((value) => value !== checkboxValue)
            );
        }
    };

    useEffect(() => {
        setSelectedTimeDeparture([]);
    }, [clearAll, setSelectedTimeDeparture]);


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
                    value={"checkProfile"}
                    onChange={handleCheckboxChange}
                    checked={selectedTimeDeparture.includes("checkProfile") ? true : false}


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
                    value={"maxPassengers"}
                    onChange={handleCheckboxChange}
                    checked={selectedTimeDeparture.includes("maxPassengers") ? true : false}


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
                    value={"smoke"}
                    onChange={handleCheckboxChange}
                    checked={selectedTimeDeparture.includes("smoke") ? true : false}



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
                    value={"pets"}
                    onChange={handleCheckboxChange}
                    checked={selectedTimeDeparture.includes("pets") ? true : false}



                />
            </div>

            <div className="separation"></div>
        </section>
    )
}


export default Services