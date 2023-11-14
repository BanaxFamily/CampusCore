import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as OfferedCourse from "../../../network/offeredCourse_api";
import CardCourses from "../../reusable/CardCourses";


export default function Wrapper() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getOfferedCourses() {
      try {
        const response = await OfferedCourse.viewAllOfferedCourse()
        setCourses(response.data)

      } catch (error) {
        console.error(error)
        setError("Cannot load data. Try again later.")
      }
      finally {
        setLoading(false)
      }
    }
    getOfferedCourses()
  }, [])
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Typography variant="p" color="error">
            {error}
          </Typography>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardCourses data={courses} />
        </div>
      )}
    </>
  )
}
