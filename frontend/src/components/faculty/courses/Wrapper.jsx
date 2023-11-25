import { Refresh } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OfferedCourse from "../../../network/offeredCourse_api";
import CardCourses from "./CardCourses";


export default function Wrapper() {
  const navigate = useNavigate()
  let {userId} = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCourseLoads() {
      try {
        const response = await OfferedCourse.getFacultyCourseLoads({'id': userId})
        setCourses(response.data)

      } catch (error) {
        console.error(error)
        setError("Cannot load data. Try again later.")
      }
      finally {
        setLoading(false)
      }
    }
    getCourseLoads()
  }, [])

  const refresh = () => {
    navigate(0);
  }
  console.log(courses)
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="flex flex-col justify-center items-center">
            <Button onClick={refresh} >
              <Refresh
                style={{ color: 'red' }} />
            </Button>
            <Typography variant="p" color="error" className="text-[12px]">
              {error}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardCourses data={courses} />
        </div>
      )}
    </>
  )
}
