import "./Navegation.css"
import React, { useContext, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import blablaLogo from "../../assets/images/blablaLogo.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'boxicons'
import { AuthContext } from "../../contexts/auth.context";


const Navegation = () => {
    const { user, logout } = useContext(AuthContext)

    const search = <box-icon name='search' color="#00AFF5"></box-icon>
    const plus = <box-icon name='plus-circle' color="#00AFF5"></box-icon>
    const userBox = <box-icon name='user' type='solid' color='#00AFF5' ></box-icon>
    const userAvatar = <img src={user?.avatar}></img>

    const navigate = useNavigate()


    return (
        <div className="prueba">
            <Navbar data-theme="dark">
                <Container>
                    <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        {<img src={blablaLogo}></img>}</Navbar.Brand>
                    <Nav>
                        <Nav.Link>
                            <span>{search} </span> Buscar
                        </Nav.Link>

                        <Nav.Link onClick={() => navigate("/crearviaje")}>
                            <span> {plus}</span> Publicar un viaje
                        </Nav.Link>

                        {user
                            ? <NavDropdown title={user ? userAvatar : userBox} id="navbarScrollingDropdown" className="menuShow" style={{ marginTop: "2%" }}>
                                <NavDropdown.Item onClick={() => navigate("/login")}>Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Cerrar Sesion</NavDropdown.Item>
                            </NavDropdown>

                            : <NavDropdown title={userBox} id="navbarScrollingDropdown" className="menuShow" style={{ marginTop: "2%" }}>
                                <NavDropdown.Item onClick={() => navigate("/login")}>Iniciar Sesion</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/signup")}>Registrarse</NavDropdown.Item>

                            </NavDropdown>

                        }


                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}

export default Navegation