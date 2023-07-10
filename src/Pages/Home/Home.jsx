import { useContext } from "react";
import Header from "../../Components/Home/Header"
import Section1 from "../../Components/Home/Section1";
import "./Home.css"
import { AuthContext } from "../../contexts/auth.context";

const Home = () => {


    return (<>
        <Header />
        <Section1 />
    </>

    )
}


export default Home