import { Alert, LinearProgress, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import * as CourseEnrollment from '../../../network/courseEnrollment_api'
import { useAuth } from '../../../utils/AuthContext'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import CoursesStudent from './CoursesStudent'

export default function CardCoursesStudent() {
  const { userId } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => {
    async function showCoursesEnrolled() {
      // try {
      const response = await CourseEnrollment.getEnrolledCourses({ "studentId": userId })
      setData(response.data)
      console.log(userId)
      // } catch (error) {

      // }
    }
    showCoursesEnrolled()
  }, [userId])

  return (
    <Stack>
      <DashBoardHeading title="Your enrolled courses" desc="" />
      <Stack className='my-2'>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!data ? <LinearProgress /> : (
            data.length > 0 ? : (<Alert severity='info' className='!rounded-lg'>No currently enrolled courses</Alert>)
          )}
        </div>
      </Stack>
    </Stack>
  )
}
