import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Auth/Login"
import SignUp from "../Pages/Auth/SignUp"
import TripsResults from "../Pages/Trips/TripsResults"
import CreateTrip from "../Pages/Trips/CreateTrip"
import SearchTrip from "../Pages/Trips/SearchTrip"
import DetailsTrip from "../Pages/Trips/DetailsTrip"
import PrivateRoute from "./PrivateRoutes"
import Request from "../Pages/Request/Request"


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/:origen/:destino/:date/:idOrigen/:idDestino" element={<TripsResults />}></Route>
            <Route path="/buscarviaje" element={<SearchTrip />}></Route>

            <Route element={<PrivateRoute />}>
                <Route path="/crearviaje" element={<CreateTrip />}></Route>
                <Route path="/detallesviaje/:idViaje" element={<DetailsTrip />}></Route>


            </Route>


        </Routes>
    )
}

export default AppRoutes