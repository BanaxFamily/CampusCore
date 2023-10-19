// import './App.css'
// import Login from './components/Login'
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Main from './components/Main'
import { SideNav } from './components/SideNav'
import { Status } from './components/Status'
function App() {

  return (
    <Router>
      <Header />

      <div className=" pt-4 md:p-12 w-full h-screen shadow ">
        <div className=' mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between'>
          <SideNav />
          <Main />
          <Status />
        </div>
      </div>

      <Footer />
    </Router>
  )
}

export default App
