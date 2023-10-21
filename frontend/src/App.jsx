// eslint-disable-next-line no-unused-vars
import { adminLinks, studentNavLinks } from './constants/index'
import Login from './components/Login';
import { Footer } from './components/Footer'
import campusCoreImg from './assets/CAMPUSCORE.png'
import { useState } from 'react';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [isLog, setisLog] = useState(false);

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

export default App
