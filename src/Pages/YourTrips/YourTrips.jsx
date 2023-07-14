import { useContext, useEffect, useState } from "react"
import tripService from "../../services/Trip.services"
import "./YourTrips.css"
import { AuthContext } from "../../contexts/auth.context"
import Loading from "../../Components/Others/Loading/Loading"
import sumTime from "../../utils/getTimeArrival"
import line from "../../assets/images/line.png"
import { useNavigate } from "react-router-dom"
import formatDate from "../../utils/FormatDate"
import SortArrByTimeEarlier from "../../utils/SortArrByTimeEarlier"
import SortArrByTimeLater from "../../utils/SortArrByTimeLater"


const YourTrips = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [driverTrips, setDriverTrips] = useState()
    const [passengerTrips, setPassengerTrips] = useState()

    const rightArrow = <box-icon name='right-arrow-alt' color='grey' ></box-icon>
    const circle = <box-icon name='circle' size="0.8em" ></box-icon>
    const check = <box-icon name='check-shield' type='solid' color='#00aff5' ></box-icon>
    const userplus = <box-icon name='user-plus'></box-icon>
    const smokeBox = <box-icon type='solid' name='hot'></box-icon>
    const dog = <box-icon type='solid' name='dog'></box-icon>


    useEffect(() => {

        if (user) {
            const { _id: idUser } = user
            tripService
                .getUserTrips(idUser)
                .then(({ data }) => {
                    setPassengerTrips(SortArrByTimeLater(data.userPassenger))
                    setDriverTrips(SortArrByTimeLater(data.userDriver))
                })
                .catch(e => console.log(e))
        }
    }, [])


    return (
        <main className="yourTrips">
            <section className="passengersTrips">
                <h3>Viajes como Pasajero</h3>
                {
                    passengerTrips
                        ?
                        passengerTrips.map(({ price, date, hourDeparture, duration, origin, owner, destination, smoke, pets, passengers, _id }, index) => {
                            return (
                                <>
                                    <h4>{formatDate(date)}</h4>
                                    <section className="eachTrip" key={index} onClick={() => navigate(`/detallesviaje/${_id}`)}>

                                        <article className="data">
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

                                            <p className="userTrip">
                                                <img src={owner.avatar} />
                                                <span style={{ width: "30%" }}>{owner.firstName}</span>
                                            </p>


                                            <img className="line" src={line} alt="" />
                                        </article>


                                        <article>
                                            <div className="price">{price},00 €</div>

                                            <span style={{ display: "flex", justifyContent: "space-evenly", position: "relative", left: "auto" }}>
                                                {pets && <span> {dog}</span>}
                                                {smoke && <span> {smokeBox}</span>}
                                                {passengers > 2 && <span> {userplus}</span>}
                                            </span>
                                        </article>



                                    </section>
                                </>
                            )
                        })
                        :
                        <Loading />
                }
            </section>

            <section className="driverTrips">
                <h3>Viajes como Conductor</h3>
                {
                    driverTrips
                        ?
                        driverTrips.map(({ price, date, hourDeparture, duration, origin, owner, destination, smoke, pets, passengers, _id }, index) => {
                            return (
                                <>
                                    <h4>{formatDate(date)}</h4>
                                    <section className="eachTrip" key={index} onClick={() => navigate(`/detallesviaje/${_id}`)}>

                                        <article className="data">
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

                                            <p className="userTrip">
                                                <img src={owner.avatar} />
                                                <span style={{ width: "30%" }}>{owner.firstName}</span>
                                            </p>


                                            <img className="line" src={line} alt="" />
                                        </article>


                                        <article>
                                            <div className="price">{price},00 €</div>

                                            <span style={{ display: "flex", justifyContent: "space-evenly", position: "relative", left: "auto" }}>
                                                {pets && <span> {dog}</span>}
                                                {smoke && <span> {smokeBox}</span>}
                                                {passengers > 2 && <span> {userplus}</span>}
                                            </span>
                                        </article>



                                    </section>
                                </>
                            )
                        })
                        :
                        <Loading />
                }
            </section>
        </main>
    )
}

export default YourTrips