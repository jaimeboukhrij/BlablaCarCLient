import { Col } from "react-bootstrap"
import { useContext, useEffect, useState, } from "react"
import formatDate from "../../../utils/FormatDate"
import Loading from "../../Others/Loading/Loading"
import sumTime from "../../../utils/getTimeArrival"
import { AuthContext } from "../../../contexts/auth.context"
import line from "../../../assets/images/line.png"


const TripsResult = ({ tripsBringResults }) => {

    const rightArrow = <box-icon name='right-arrow-alt' color='grey' ></box-icon>
    const circle = <box-icon name='circle' size="0.8em" ></box-icon>
    const check = <box-icon name='check-shield' type='solid' color='#00aff5' ></box-icon>
    const userplus = <box-icon name='user-plus'></box-icon>
    const smoke = <box-icon type='solid' name='hot'></box-icon>
    const dog = <box-icon type='solid' name='dog'></box-icon>

    const { user } = useContext(AuthContext)


    return (
        <Col md={{ span: 4, offset: 1 }} className="results">
            <h4 style={{ fontWeight: "bold" }}>{formatDate(tripsBringResults?.[0].date)}</h4>
            <p>{tripsBringResults?.[0].origin.name} <span >{rightArrow}</span>{tripsBringResults?.[0].destination.name}:</p>
            <p>{tripsBringResults?.length} viajes disponibles</p>

            {
                tripsBringResults
                    ?
                    tripsBringResults.map(({ price, hourDeparture, duration, origin, hourArrival, destination }, index) => {
                        return (
                            <div className="eachTrip" key={index}>
                                <div className="data">
                                    <p>
                                        <span style={{ width: "20%" }}>{hourDeparture} {circle}</span>
                                        <span style={{ width: "80%" }}>{origin.name}</span>
                                    </p>

                                    <p style={{ fontSize: "0.9em" }}>{duration.substring(0, 5).replace(/\s/g, "")}</p>

                                    <p>
                                        <span style={{
                                            marginBottom: "5%", width: "20%"
                                        }}>{sumTime(hourDeparture, duration)} {circle}</span>
                                        <span style={{ width: "80%" }}>{destination.name}</span>
                                    </p>

                                    <p >
                                        <p className="userTrip">
                                            <img src={user.avatar} />
                                            <span style={{ width: "80%" }}>{user.firstName}</span>
                                        </p>
                                        <span style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <span> {dog}</span>
                                            <span> {smoke}</span>
                                            <span> {userplus}</span>
                                        </span>

                                    </p>

                                    <img className="line" src={line} alt="" />
                                </div>

                                <div className="price">{price},00 €</div>

                            </div>
                        )
                    })
                    :
                    <Loading />
            }

        </Col>
    )
}

export default TripsResult