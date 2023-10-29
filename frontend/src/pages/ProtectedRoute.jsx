import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/utils/UseAuth';
import AuthContainer from './AuthContainer';

const ProtectedRoute = () => {
  const auth = useAuth()
  return (
    <>
    {
      !auth.user ? <Navigate to="/login" replace/> : <AuthContainer/>
    }
    </>
  )
}

export default ProtectedRoute