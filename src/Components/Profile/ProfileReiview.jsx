import { useContext, useEffect, useState } from "react";
import tripService from "../../services/Trip.services";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

const ProfileReview = ({ userId }) => {

    const star = <box-icon name='star' type='solid' color='#6f8b90' ></box-icon>
    const arrow = <box-icon name='chevron-right' type='solid' color='#6f8b90' size="1.8em" ></box-icon>

    const [allReviews, setReviews] = useState()
    const [score, setScore] = useState()
    const { user } = useContext(AuthContext)
    const [section, setSection] = useState("main")

    const navigate = useNavigate()

    useEffect(() => {

        tripService
            .getUserReview(userId)
            .then(({ data }) => {
                setReviews(data)
                const sum = data.reduce((acc, value) => acc + value.score, 0)
                setScore(sum / data.length)
            })
            .catch(e => console.log(e))
    }, [])


    return (
        <>
            {
                section == "main" &&
                <section className="reviewsection" onClick={() => navigate(`/reviews/${userId}`)}>
                    <div style={{ display: "flex", width: "55%" }}>
                        <span>{star}</span>
                        <p>{score?.toFixed(1)} / 5 - {allReviews?.length} opiniones</p>
                    </div>

                    <span>{arrow}</span>
                </section>
            }



        </>
    )
}


export default ProfileReview