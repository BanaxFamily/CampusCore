/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, LinearProgress, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import * as CourseEnrollment from '../../../network/courseEnrollment_api'
import { useAuth } from '../../../utils/AuthContext'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import CardCoursesStudent from './CardCoursesStudent'

export default function CourseStudent() {
  const { userId } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // const [error, setError] = useState(null)
  useEffect(() => {
    async function showCoursesEnrolled() {
      try {
        const response = await CourseEnrollment.getEnrolledCourses({ "studentId": userId })
        if (response.isSuccess) {
          setData(response.data)
        }
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    showCoursesEnrolled()
  }, [])

  return (
    <Stack>
      <DashBoardHeading title="Your enrolled courses" desc="" />
      {loading && <LinearProgress />}
      {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
      <Stack className='my-2 w-full'>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {
            !loading && !error &&
            <>
              {
                data.length > 0 ? (<CardCoursesStudent data={data} />) : (<Alert severity="success">Something went wrong. Try again later</Alert>)
              }
            </>
          }
        </div>
      </Stack>
    </Stack>
  )
}
