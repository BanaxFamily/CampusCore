import campusCoreImg from '../assets/CAMPUSCORE.png'
import { Footer } from '../components/Footer'
import Login from '../components/Login'
const LandingPage = () => {
  return (
    <>
    <div className='mx-auto max-w-7xl flex flex-col md:flex-row mb-10'>
        <div className='md:w-1/2 '>
            <img className=' max-h-screen w-auto block md:m-auto ' src={campusCoreImg} alt="Campus Core Logo" />
        </div>
        {/* FIX HERE ADD top margin when it used Login */}
        <div className='md:w-1/2 md:mt-5'>
            <Login/>
        </div>
    </div>
    
    <Footer/>
    </>
  )
}

export default LandingPage