import { useState } from "react";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";
import { Footer } from "../coamponents/Footer";
import campusCoreImg from './assets/CAMPUSCORE.png'

export default function Home(props) {
    const [isLog, setisLog] = useState(false);

    // Handle the PROPS passsed from the APP for authentication

    const loginContainer =
        <>
            <div className='mx-auto max-w-7xl flex flex-col md:flex-row mb-10'>
                <div className='md:w-1/2 '>
                    <img className=' max-h-screen w-auto block md:m-auto ' src={campusCoreImg} alt="Campus Core Logo" />
                </div>

                <div className='md:w-1/2 md:mt-5'>
                    <Login />

                </div >
            </div>
        </>

    return (
        <>
            {
                isLog ? <ProtectedRoute /> : loginContainer
            }
            <Footer />
        </>
    )
}
