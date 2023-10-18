// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./Home"
import Courses from './Courses'

const Main = () => {
  return (
    <div className="w-full flex flex-col justify-start px-4">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/courses' element={<Courses/>}/>
        </Routes>
    </div>
  )
}

export default Main 