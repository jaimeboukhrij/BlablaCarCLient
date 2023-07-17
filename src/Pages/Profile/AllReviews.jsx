import "./AllReviews.css"

import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import tripService from "../../services/Trip.services"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/User.services"

const AllReviews = () => {

    const { idUser } = useParams()

    const arrow = <box-icon name='chevron-right' type='solid' color='#6f8b90' size="2.5em" ></box-icon>

    const [allReviews, setReviews] = useState()
    const [score, setScore] = useState()
    const { user } = useContext(AuthContext)
    const [ownerReviewInf, setOwnerReviewInf] = useState()
    const [toReviewInf, setToReviewInf] = useState()
    const [section, setSection] = useState("main")

    const navigate = useNavigate()

    useEffect(() => {

        tripService
            .getUserReview(idUser)
            .then(({ data }) => {
                console.log(data)
                setReviews(data)
                const sum = data.reduce((acc, value) => acc + value.score, 0)
                setScore(sum / data.length)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => allReviews && getToReviewInfo(), [allReviews])


    const getToReviewInfo = () => {

        const allPromises = allReviews?.map(({ owner }) => userService.getUser(owner).then((res) => res.data))

        if (allPromises) {
            Promise.all(allPromises)
                .then((response) => { setOwnerReviewInf(response) })
                .catch((err) => console.log(err));
        }
    }




    return (
        <main className="allReviews">
            <section className="section1">
                <h4>Opiniones</h4>
                <h5>{score?.toFixed(1)} / 5</h5>
                <p style={{ color: "#05404a", fontWeight: "bold", marginTop: "-5px" }}>{allReviews?.length} opiniones</p>
            </section>

            {allReviews && <section className="section2">
                <div>
                    <p>Excelente</p>
                    <p>{allReviews.filter((elem => elem.score > 4)).length}</p>
                </div>
                <div>
                    <p>Muy bien</p>
                    <p>{allReviews.filter((elem => (elem.score > 3) && (elem.score <= 4))).length}</p>

                </div>
                <div>
                    <p>Correcto</p>
                    <p>{allReviews.filter((elem => (elem.score > 2) && (elem.score <= 3))).length}</p>


                </div>
                <div>
                    <p>Mal</p>
                    <p>{allReviews.filter((elem => (elem.score > 1) && (elem.score <= 2))).length}</p>


                </div>
                <div>
                    <p>Muy mal</p>
                    <p>{allReviews.filter((elem => (elem.score > 0) && (elem.score <= 1))).length}</p>


                </div>

            </section>
            }

            <section className="section3">
                {
                    allReviews?.map((elem, i) => {

                        return (
                            <div className="eachReview" key={i} onClick={() => navigate(`/perfil/${ownerReviewInf?.[i]._id}`)}>
                                <div>
                                    <h4>{ownerReviewInf?.[i].firstName}</h4>
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        <img src={ownerReviewInf?.[i].avatar} alt="" />
                                        <span style={{ marginLeft: "6%" }}>{arrow}</span>
                                    </span>
                                </div>
                                <div>
                                    <p style={{ fontWeight: "bold", fontSize: "1.4em" }}>{elem.score}  {"\u2605"}</p>
                                    <p>{elem.text}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </section>


        </main>
    )
}


export default AllReviews