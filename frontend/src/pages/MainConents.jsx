/* eslint-disable react/prop-types */
import Main from '../components/reusable/Main'
import ProtectedContainer from './ProtectedContainer'

export default function MainContents(props) {
  return (
    <ProtectedContainer userType={props.user_role} component={<Main/>}/>
  )
}
