// import './App.css'
// import Login from './components/Login'
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import Main from './components/Main'
import { Status } from './components/Status'
// eslint-disable-next-line no-unused-vars
import { adminLinks, studentNavLinks } from './constants/index'
import SideNav from './components/SideNav';
function App() {

  return (
    <Router>
      <Header />

      <div className=" pt-4 md:p-12 w-full h-screen shadow ">
        <div className=' mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between'>
          <div className="w-[16%] hidden md:block h-[400px] p-2 border rounded-lg shadow-lg sticky top-0">
            <div className="w-full flex flex-col justify-start items-start gap-6 md:gap-3 text-[12px]  
                 
            ">
              {/* If user is a Student  ADD CONDITIONAL RENDERING*/}
              {/* {
                studentNavLinks.map((nav) => (
                  <SideNav
                    key={nav.id}
                    id={nav.id}
                    link={nav.link}
                    // icon={nav.icon}
                    text={nav.title}
                  />
                ))
              } */}

              {/* If user is an Admin */}
              {
                adminLinks.map((nav) => (
                  <SideNav
                    key={nav.id}
                    id={nav.id}
                    link={nav.link}
                    text={nav.title}
                    icon={nav.icon}
                  />
                ))
              }
            </div>
          </div>
          <Main />
          <Status />
        </div>
      </div>

      <Footer />
    </Router>
  )
}

export default App
