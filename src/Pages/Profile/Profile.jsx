import { useContext, useEffect, useState } from "react";
import "./Profile.css"
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../contexts/auth.context";
import userService from "../../services/User.services";
import AgeCalculator from "../../utils/AgeCalculator";
import tripService from "../../services/Trip.services";
import FormatDateProfile from "../../utils/FormatDateProfile";
import ProfileReview from "../../Components/Profile/ProfileReiview";
import uploadServices from "../../services/upload.service";


const Profile = () => {
    const { user } = useContext(AuthContext)
    const x = <box-icon name='x' color='#00aff5' size="2em" ></box-icon>
    const talk1 = <box-icon name='message-dots' ></box-icon>
    const talk2 = <box-icon name='message-minus' ></box-icon>
    const talk3 = <box-icon name='comment-x' ></box-icon>
    const music = <box-icon name='music'></box-icon>
    const notMusic = <box-icon name='volume-mute'></box-icon>
    const pet = <box-icon type='solid' name='dog'></box-icon>
    const notPet = <box-icon name='x-circle'></box-icon>

    const [showUser, setUser] = useState()
    const [showSection, setSection] = useState("main")
    const [selectedOption, setSelectedOption] = useState()
    const [personalData, setPersonalData] = useState({ talk: "", music: "", smoke: "", pets: "" })
    const [userTrips, setUserTrips] = useState()
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState()
    const [loadImages, setLoadImages] = useState(false)


    const handleClose = () => {
        setShowImage()
        setShow(false)
    };
    const handleShow = () => setShow(true);



    useEffect(() => {
        if (user) {
            const { _id } = user
            userService
                .getUser(_id)
                .then(({ data }) => {
                    setPersonalData(data.personalData)
                    setUser(data)
                })
                .catch(e => console.log(e))

            tripService
                .getOwnerTrips(_id)
                .then(({ data }) => setUserTrips(data))
                .catch(e => console.log(e))
        }
    }, [show])

    const handleOptionChange = (event) => {
        const { value, name } = event.target
        setSelectedOption(parseInt(value));
        setPersonalData({ ...personalData, [name]: parseInt(value) })
    }

    const handleSubmitTalk = (e) => {
        e.preventDefault()
        setSection("main")
        userService
            .editUSerpersonalData(personalData)
            .then(({ data }) => console.log("data"))
    }


    const handleFileUpload = e => {
        setLoadImages(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setShowImage(res.data.cloudinary_url)
                res && setLoadImages(false)
            })
            .catch(err => console.log(err))
    }


    const hanldeSubmitImage = () => {
        if (user) { }
        const { _id: idUser } = user
        userService
            .editUserAvatar({ idUser, showImage })
            .then(() => handleClose())
    }



    return (
        <>
            {
                (showUser && (showSection == "main")) &&
                <main className="profile">
                    <section className="name">
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5 %" }}>
                            <span style={{ marginLeft: "2%" }}>
                                <p style={{ marginTop: "15%", marginBottom: "0" }}>{showUser.firstName} {showUser.lastName}</p>
                                <p style={{ color: "#6F8BA9", fontSize: ".9em", marginTop: "-2%" }}>{AgeCalculator(showUser.bornDate)} años</p>
                            </span>
                            <span>
                                <img src={showUser.avatar} alt="" />
                            </span>
                        </div>

                        <div id="edit" onClick={handleShow}>
                            Editar foto de perfil
                        </div>



                    </section>

                    <section className="review">
                        <ProfileReview userId={user._id} />
                    </section>

                    <section className="personalData">
                        <h6 style={{ marginBottom: "5%" }}>Informacion personal</h6>
                        {personalData && <article className="data">
                            {personalData?.talk == 1 && <p style={{ display: "flex" }}> <span>{talk1}</span> ¡Hablo por los codos!</p>}
                            {personalData?.talk == 2 && <p style={{ display: "flex" }}><span>{talk2}</span> Hablo cuando me siento cómodo</p>}
                            {personalData?.talk == 3 && <p style={{ display: "flex" }}> <span>{talk3}</span>No hablo mucho</p>}

                            {personalData?.music == 1 && <p style={{ display: "flex" }}> <span>{music}</span>¡Con la música a todas partes!</p>}
                            {personalData?.music == 2 && <p style={{ display: "flex" }}> <span>{music}</span>Escucho música dependiendo de la situación</p>}
                            {personalData?.music == 3 && <p style={{ display: "flex" }}> <span>{notMusic}</span>El silencio es oro</p>}



                            {personalData?.pets == 1 && <p style={{ display: "flex" }}> <span>{pet}</span>Me encantan las mascotas. ¡Guau,guau!</p>}
                            {personalData?.pets == 2 && <p style={{ display: "flex" }}> <span>{pet}</span>Viajo con mascotas en función del animal</p>}
                            {personalData?.pets == 3 && <p style={{ display: "flex" }}> <span>{notPet}</span>Prefiero no viajar con mascotas</p>}
                        </article>}
                        <div onClick={() => setSection("choiceTrip")}>Editar preferencias de viaje</div>
                    </section>

                    <section className="info">
                        <p>{userTrips?.length} viajes publicados </p>
                        <p>Usuario desde {FormatDateProfile(showUser.createdAt)}</p>
                    </section>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton style={{ border: "none" }}>

                        </Modal.Header>
                        <Modal.Body style={{ display: "flex", justifyContent: "center" }} >
                            {
                                showImage
                                    ? <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                        <img style={{ width: "300px" }} src={showImage}></img>

                                        <Button type="submit" style={{ marginTop: "3%" }} onClick={hanldeSubmitImage} >
                                            Confirmar cambio
                                        </Button>

                                        <Button variant="danger" style={{ marginTop: "3%" }} onClick={() => setShowImage()}  >
                                            Subir otra imagen
                                        </Button>
                                    </div>
                                    : <Form>



                                        <label className="custum-file-upload" for="file">
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                                            </div>
                                            <div className="text">
                                                <span>Pulse para subir la imagen</span>
                                            </div>
                                            <input type="file" id="file" onChange={handleFileUpload} />
                                        </label>

                                    </Form>
                            }
                        </Modal.Body>

                    </Modal >

                </main >
            }
























            {
                (showSection == "choiceTrip") &&
                <main className="choiceTrip">
                    <span onClick={() => setSection("main")} style={{ cursor: "pointer" }}>{x}</span>
                    <h3>Preferencias de viaje</h3>

                    <div className="eachOne" onClick={() => setSection("talk")}>
                        <span>Conversacion</span>
                        {personalData?.talk == 1 && <p> <span>{talk1}</span> ¡Hablo por los codos!</p>}
                        {personalData?.talk == 2 && <p><span>{talk2}</span> Hablo cuando me siento cómodo</p>}
                        {personalData?.talk == 3 && <p> <span>{talk3}</span>No hablo mucho</p>}
                    </div>
                    <div className="eachOne" onClick={() => setSection("music")}>
                        <span>Música</span>
                        {personalData?.music == 1 && <p> <span>{music}</span>¡Con la música a todas partes!</p>}
                        {personalData?.music == 2 && <p> <span>{music}</span>Escucho música dependiendo de la situación</p>}
                        {personalData?.music == 3 && <p> <span>{notMusic}</span>El silencio es oro</p>}
                    </div>

                    <div className="eachOne" onClick={() => setSection("pets")}>
                        <span>Mascotas</span>
                        {personalData?.pets == 1 && <p> <span>{pet}</span>Me encantan las mascotas. ¡Guau,guau!</p>}
                        {personalData?.pets == 2 && <p> <span>{pet}</span>Viajo con mascotas en función del animal</p>}
                        {personalData?.pets == 3 && <p> <span>{notPet}</span>Prefiero no viajar con mascotas</p>}
                    </div>
                </main>
            }






            {
                (showSection == "talk") &&
                <main className="choiceTrip talk">
                    <span onClick={() => setSection("choiceTrip")} style={{ cursor: "pointer" }}>{x}</span>
                    <h3>Conversación</h3>

                    <Form>
                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, talk: 1 })
                            setSelectedOption(1)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span> {talk1}</span>
                                <h5>¡Hablo por los codos!</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="talk"
                                type="radio"
                                id="talkOption1"
                                value={1}
                                checked={personalData?.talk === 1}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption1" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, talk: 2 })
                            setSelectedOption(2)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{talk2}</span>
                                <h5>Hablo cuando me siento cómodo</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="talk"
                                type="radio"
                                id="talkOption2"
                                value={2}
                                checked={personalData?.talk === 2}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption2" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, talk: 3 })
                            setSelectedOption(3)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{talk3}</span>
                                <h5>No hablo mucho</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="talk"
                                type="radio"
                                id="talkOption3"
                                value={3}
                                checked={personalData?.talk === 3}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption3" />
                        </div>

                        <button onClick={handleSubmitTalk}>Guardar</button>
                    </Form>

                </main>
            }







            {
                (showSection == "music") &&
                <main className="choiceTrip talk">
                    <span onClick={() => setSection("choiceTrip")} style={{ cursor: "pointer" }}>{x}</span>
                    <h3>Música</h3>

                    <Form>
                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, music: 1 })
                            setSelectedOption(1)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{music}</span>
                                <h5>¡Con la música a todas partes!</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="music"
                                type="radio"
                                id="talkOption1"
                                value={1}
                                checked={personalData?.music === 1}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption1" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, music: 2 })
                            setSelectedOption(2)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{music}</span>
                                <h5>Escucho música dependiendo de la situación</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="music"
                                type="radio"
                                id="talkOption2"
                                value={2}
                                checked={personalData?.music === 2}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption2" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, music: 3 })
                            setSelectedOption(3)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{notMusic}</span>
                                <h5>El silencio es oro</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="music"
                                type="radio"
                                id="talkOption3"
                                value={3}
                                checked={personalData?.music === 3}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption3" />
                        </div>

                        <button onClick={handleSubmitTalk}>Guardar</button>
                    </Form>

                </main>
            }






            {
                (showSection == "smoke") &&
                <main className="choiceTrip talk">
                    <span onClick={() => setSection("choiceTrip")} style={{ cursor: "pointer" }}>{x}</span>
                    <h3>Fumar</h3>

                    <Form>
                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, smoke: 1 })
                            setSelectedOption(1)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span></span>
                                <h5>Fumar no es un problema</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="smoke"
                                type="radio"
                                id="talkOption1"
                                value={1}
                                checked={personalData?.smoke === 1}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption1" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, smoke: 2 })
                            setSelectedOption(2)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span></span>
                                <h5>Acepto paradas para fumar</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="smoke"
                                type="radio"
                                id="talkOption2"
                                value={2}
                                checked={personalData?.smoke === 2}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption2" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, smoke: 3 })
                            setSelectedOption(3)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span></span>
                                <h5>No quiero que se fume</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="smoke"
                                type="radio"
                                id="talkOption3"
                                value={3}
                                checked={personalData?.smoke === 3}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption3" />
                        </div>

                        <button onClick={handleSubmitTalk}>Guardar</button>
                    </Form>

                </main>
            }






            {
                (showSection == "pets") &&
                <main className="choiceTrip talk">
                    <span onClick={() => setSection("choiceTrip")} style={{ cursor: "pointer" }}>{x}</span>
                    <h3>Mascotas</h3>

                    <Form>
                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, pets: 1 })
                            setSelectedOption(1)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{pet}</span>
                                <h5>Me encantan las mascotas. ¡Guau,guau!</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="pets"
                                type="radio"
                                id="talkOption1"
                                value={1}
                                checked={personalData?.pets === 1}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption1" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, pets: 2 })
                            setSelectedOption(2)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{pet}</span>
                                <h5>Viajo con mascotas en función del animal</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="pets"
                                type="radio"
                                id="talkOption2"
                                value={2}
                                checked={personalData?.pets === 2}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption2" />
                        </div>

                        <div className="eachSort" onClick={() => {
                            setPersonalData({ ...personalData, pets: 3 })
                            setSelectedOption(3)
                        }}>
                            <div style={{ display: "flex", width: "80%" }}>
                                <span>{notPet}</span>
                                <h5>Prefiero no viajar con mascotas</h5>
                            </div>
                            <Form.Check
                                reverse
                                name="pets"
                                type="radio"
                                id="talkOption3"
                                value={3}
                                checked={personalData?.pets === 3}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="talkOption3" />
                        </div>

                        <button onClick={handleSubmitTalk}>Guardar</button>
                    </Form>

                </main>
            }

        </>

    )

}
export default Profile