import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const SortBy = ({ setResultSortBy, setClearAll, clearAll }) => {
    const [selectedOption, setSelectedOption] = useState("earlier");

    const time = <box-icon name="time-five" size="1.4em"></box-icon>;
    const timeSolid = <box-icon type="solid" name="time"></box-icon>;
    const coin = <box-icon type="solid" name="coin"></box-icon>;
    const coinSolid = <box-icon type="solid" name="coin-stack"></box-icon>;

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setResultSortBy(event.target.value)
    }

    useEffect(() => setSelectedOption("earlier"), [clearAll]);

    return (
        <section className="sortBy">
            <Form>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6%" }}>
                    <h4 style={{ fontWeight: "bold" }}>Ordenar por</h4>
                    <p
                        onClick={() => setClearAll(!clearAll)}
                        style={{ fontSize: "1em", color: "#00AFF5", fontWeight: "bold", cursor: "pointer" }}>Borrar todo</p>
                </div>

                <div className="eachSort">
                    <div style={{ display: "flex", width: "80%" }}>
                        <span>{time}</span>
                        <h5>Salida mas temprana</h5>
                    </div>
                    <Form.Check
                        reverse
                        name="sortByOption"
                        type="radio"
                        value="earlier"
                        checked={selectedOption === "earlier"}
                        onChange={handleOptionChange}
                    />
                </div>
                <div className="eachSort">
                    <div style={{ display: "flex", width: "80%" }}>
                        <span>{timeSolid}</span>
                        <h5>Salida mas tardia</h5>
                    </div>
                    <Form.Check
                        reverse
                        name="sortByOption"
                        type="radio"
                        value="later"
                        checked={selectedOption === "later"}
                        onChange={handleOptionChange}
                    />
                </div>
                <div className="eachSort">
                    <div style={{ display: "flex", width: "80%" }}>
                        <span>{coin}</span>
                        <h5>Precio más bajo</h5>
                    </div>
                    <Form.Check
                        reverse
                        name="sortByOption"
                        type="radio"
                        value="cheaper"
                        checked={selectedOption === "cheaper"}
                        onChange={handleOptionChange}
                    />
                </div>

                <div className="eachSort">
                    <div style={{ display: "flex", width: "80%" }}>
                        <span>{coinSolid}</span>
                        <h5>Precio más alto</h5>
                    </div>
                    <Form.Check
                        reverse
                        name="sortByOption"
                        type="radio"
                        value="expensive"
                        checked={selectedOption === "expensive"}
                        onChange={handleOptionChange}
                    />
                </div>
            </Form>

            <div className="separation"></div>
        </section>
    );
};

export default SortBy;
