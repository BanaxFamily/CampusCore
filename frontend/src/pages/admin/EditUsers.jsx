import UserWrapper from '../../components/administrator/user-wrapper/UserWrapper'
import ProtectedContainer from '../ProtectedContainer'

export default function EditUsers() {
  return (
    <ProtectedContainer userType='admin' component={<UserWrapper/>}/>
  )
}
