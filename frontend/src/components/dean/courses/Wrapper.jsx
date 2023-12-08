import { Alert, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import * as OfferedCourse from "../../../network/offeredCourse_api";
import CardCourses from "./CardCourses";


export default function Wrapper() {
  // const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [courseDeliverableError, setCourseDeliverableError] = useState(false)

  useEffect(() => {
    async function getOfferedCourses() {
      try {
        const response = await OfferedCourse.viewAllOfferedCourse()
        if (response.isSuccess) {
          setCourses(response.data)
          console.log(response.data)
          return
        }
      } catch (error) {
        console.error(error)
        setCourseDeliverableError(true)
      }
      finally {
        setLoading(false)
      }
    }
    getOfferedCourses()
  }, [])

  return (

    <>
      {loading && <LinearProgress />}
      {courseDeliverableError && <Alert severity="error">Something went wrong try again later.</Alert>}
      {!loading && !courseDeliverableError &&
        <>
          {
            courses.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <CardCourses data={courses} />
              </div>
            ) : (<Alert severity="info"> You have no courses enrolled</Alert>)
          }
        </>
      }
    </>
  )
}
