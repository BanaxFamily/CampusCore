import { Alert, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import * as Course from "../../../network/course_api";
import CardCourses from "./CardCourses";


export default function Wrapper() {
  // const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [courseDeliverableError, setCourseDeliverableError] = useState(false)

  useEffect(() => {
    async function getOfferedCourses() {
      try {
        const response = await Course.viewCourse()

        if (response.isSuccess) {
          setCourses(response.data)
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

  // const refresh = () => {
  //   navigate(0);
  // }
  return (
    <>
      {loading && <LinearProgress/>}
      {courseDeliverableError && <Alert severity="error">Something went wrong try again later.</Alert>}
      {!loading && !courseDeliverableError &&
        <>
          {
            courses.length > 0 ? (
              <div className=" 2xl:w-3/4 2xl:mx-auto mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <CardCourses data={courses} />
              </div>
            ) : (<Alert severity="info"> You have no courses enrolled</Alert>)
        }
        </>
      }
    </>
  )
}
