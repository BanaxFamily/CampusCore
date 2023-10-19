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
      <Header/>

      <div className=" mx-auto pt-4 md:p-12 w-full h-screen shadow-xl flex justify-between">
        <SideNav/>
        <Main/>
        <Status/>
      </div>

      <Footer/>
    </Router>
  )
}

export default App
