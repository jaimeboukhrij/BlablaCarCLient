import "./auth.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "../../Components/Others/Loading/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import authService from "../../services/Auth.services";
import uploadServices from "../../services/upload.service";


const SignUp = () => {

    let [showSection, setSection] = useState(1)
    const [showError, setError] = useState()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [loadImages, setLoadImages] = useState(false)
    const [userData, setUserData] = useState({
        email: "",
        date: "",
        firstName: "",
        lastName: "",
        password: "",
        avatar: ""

    })

    const navigate = useNavigate()

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleEmail = e => {
        e.preventDefault()
        authService
            .checkEmail(userData.email)
            .then(({ data }) => {
                if (!data) {
                    showSection += 1
                    setSection(showSection)
                }
                else {
                    setError("El email ya se escuentra en la base de datos")
                }
            })
    }

    const handleChangeEmail = ({ target }) => {
        setUserData({ ...userData, email: target.value })
        if (isValidEmail(target.value)) {
            setIsButtonDisabled(false)
            setError();
        }
        else {
            setError("Por favor, introduce un email válido");

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        authService
            .signup(userData)
            .then(({ data }) => navigate("/login"))
            .catch(e => console.log(e))
    }


    const handleFileUpload = e => {
        setLoadImages(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUserData({ ...userData, avatar: res.data.cloudinary_url })
                res && setLoadImages(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <main className="signup">
            {
                showSection == 1 &&
                <div className="email">

                    <h2>¿Cuál es tu email?</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={handleChangeEmail} type="email" placeholder="Email" />
                        </Form.Group>

                        {showError && <p>{showError}</p>}

                        <Button type="submit" onClick={handleEmail} disabled={isButtonDisabled}>
                            Continuar
                        </Button>
                    </Form>
                </div>
            }

            {
                showSection == 2 &&
                <div className="name">

                    <h2>¿Cómo te llamas?</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Nombre" name="firstName"
                                onChange={({ target }) => setUserData({ ...userData, firstName: target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Apellidos" name="lastName"
                                onChange={({ target }) => setUserData({ ...userData, lastName: target.value })} />
                        </Form.Group>

                        {/* <p>He olvidado mi contraseña</p> */}

                        <Button type="submit" onClick={(e) => {
                            e.preventDefault()
                            setSection(3)
                        }}>
                            Continuar
                        </Button>
                    </Form>
                </div>
            }

            {
                showSection == 3 &&
                <div className="name">

                    <h2>Fecha de Nacimiento</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="date" name="date"
                                onChange={({ target }) => setUserData({ ...userData, date: target.value })} />
                        </Form.Group>


                        {/* <p>He olvidado mi contraseña</p> */}

                        <Button type="submit" onClick={(e) => {
                            e.preventDefault()
                            setSection(4)
                        }}>
                            Continuar
                        </Button>
                    </Form>
                </div>
            }

            {
                showSection == 4 &&
                <div className="name">

                    <h2>Elija una contraseña</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password" name="password"
                                onChange={({ target }) => setUserData({ ...userData, password: target.value })} />
                        </Form.Group>


                        {/* <p>He olvidado mi contraseña</p> */}
                        <Button type="submit" onClick={(e) => {
                            e.preventDefault()
                            setSection(5)
                        }}>
                            Continuar
                        </Button>
                    </Form>
                </div>
            }

            {
                showSection == 5 &&
                <div className="name">

                    <h2>Seleccione una imagen</h2>
                    <Form>

                        <label className="custum-file-upload" for="file">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                            </div>
                            <div className="text">
                                <span>Click to upload image</span>
                            </div>
                            <input type="file" id="file" onChange={handleFileUpload} />
                        </label>


                        <Button type="submit" onClick={handleSubmit}>
                            {loadImages ? "Subiendo imagen..." : "Registrarse"}
                        </Button>
                    </Form>
                </div>
            }


        </main>
    )
}



export default SignUp