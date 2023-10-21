// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import Home from './pages/Home';

function App() {
  const [isLog, setisLog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Add logic here when user GET API is finished

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home loggedInUser={loggedInUser} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
