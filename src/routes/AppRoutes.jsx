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
import Profile from "../Pages/Profile/Profile"
import YourTrips from "../Pages/YourTrips/YourTrips"
import AllReviews from "../Pages/Profile/AllReviews"
import TheirProfile from "../Pages/Profile/TheirProfile"


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/:origen/:destino/:date/:idOrigen/:idDestino/:passengers" element={<TripsResults />}></Route>
            <Route path="/buscarviaje" element={<SearchTrip />}></Route>

            <Route element={<PrivateRoute />}>
                <Route path="/crearviaje" element={<CreateTrip />}></Route>
                <Route path="/detallesviaje/:idViaje" element={<DetailsTrip />}></Route>
                <Route path="/miperfil/" element={<Profile />}></Route>
                <Route path="/perfil/:idUser" element={<TheirProfile />}></Route>
                <Route path="/reviews/:idUser" element={<AllReviews />}></Route>
                <Route path="/tusviajes" element={<YourTrips />}></Route>


            </Route>


        </Routes>
    )
}

export default AppRoutes