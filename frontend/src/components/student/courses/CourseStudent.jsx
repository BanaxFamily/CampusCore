import { Alert, Card, CardActionArea, CardActions, CardContent, LinearProgress, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import * as CourseEnrollment from '../../../network/courseEnrollment_api'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../utils/AuthContext'
import DashBoardHeading from '../../reusable/DashBoardHeading'

export default function CardCoursesStudent() {
  const { userId } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => {
    async function showCoursesEnrolled() {
      // try {
      const response = await CourseEnrollment.getEnrolledCourses({ "studentId": userId })
      setData(response.data)
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
            data.length > 0 ? data.map((item, index) => (

              <div className='shadow-md rounded-md hover:shadow-gray-800 ' key={index} >

                <Card sx={{ maxWidth: 'auto', width: '100%', height: '10rem', margin: 'auto' }} >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.course.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Link to={`submission`} size="small" color="primary" className=' text-blue-500 hover:text-mainBlueColor'>
                      Open
                    </Link>
                  </CardActions>
                </Card>
              </div>
            )) : (<Alert severity='info' className='!rounded-lg'>No currently enrolled courses</Alert>)
          )}
        </div>
      </Stack>
    </Stack>
  )
}
