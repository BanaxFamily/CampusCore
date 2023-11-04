import Main from '../components/reusable/Main'
import ProtectedContainer from './ProtectedContainer'

export default function MainContents() {
  return (
    <ProtectedContainer userType='admin' component={<Main/>}/>
  )
}
