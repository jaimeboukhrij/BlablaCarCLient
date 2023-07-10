import { useContext, useState } from "react";
import "./auth.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authService from "../../services/Auth.services";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth.context"
const Login = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const { authenticateUser, user, storeToken } = useContext(AuthContext)



    const handleChange = e => {
        const { value, name } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService
            .login(userData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate("/")
            })
    }




    return (
        <main className="login">
            <h2>¿Cuál es tu email y contraseña?</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>
                <p>He olvidado mi contraseña</p>

                <Button type="submit" onClick={handleSubmit}>
                    Iniciar sesión
                </Button>
            </Form>

        </main>
    )
}


export default Login