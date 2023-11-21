import { useAuth } from "../../utils/AuthContext"
import IssueDean from "../dean/courses/submission/IssueDean"

export const Status = () => {
  const {userRole} = useAuth()
  return (
    <>
      {
        userRole === 'Dean' && <IssueDean/>
      }
    </>
  )
}
