/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import Main from '../components/reusable/Main'
import { useAuth } from '../utils/AuthContext'
import ProtectedContainer from './ProtectedContainer'

export default function MainContents() {
  const {user} = useAuth()

  return (
    user ? <ProtectedContainer component={<Main/>}/> : <Navigate to="/login" replace="true"/>
  )
}
