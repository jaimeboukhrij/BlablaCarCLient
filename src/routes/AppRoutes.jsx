import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Auth/Login"
import SignUp from "../Pages/Auth/SignUp"
import TripsResults from "../Pages/Trips/TripsResults"
import CreateTrip from "../Pages/Trips/CreateTrip"


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/:origen/:destino/:date/:idOrigen/:idDestino" element={<TripsResults />}></Route>
            <Route path="/crearviaje" element={<CreateTrip />}></Route>

        </Routes>
    )
}

export default AppRoutes