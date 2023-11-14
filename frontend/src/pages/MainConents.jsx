/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import Main from '../components/reusable/Main'
import ProtectedContainer from './ProtectedContainer'
import { useAuth } from '../utils/AuthContext'

export default function MainContents() {
  const {user} = useAuth()

  // if (!localStorage.getItem('role')) {
  //   return <Navigate to="/login" replace={true}/>
  // }
  return (
    user ? <ProtectedContainer component={<Main/>}/> : <Navigate to={'/login'} />
  )
}
