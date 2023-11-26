import { MoreHoriz } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CardCoursesStudent({ data }) {
  return (
    data.map((course, index) => (

      <div className='shadow-md rounded-md hover:shadow-gray-800 ' key={index} >
        <Card sx={{ maxWidth: 'auto', width: '100%', margin: 'auto' }} >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreHoriz />
              </IconButton>
            }
            title={course.offeredCourse.facultyAssigned.fullName}
            subheader={course.offeredCourse.schedule}
          />
          <Link to={`submission`} size="small" color="primary" className='hover:!text-blue-300'>
            <CardActionArea>
              <CardContent className='h-[6rem]'>
                <Typography gutterBottom variant="h5" component="div" fontSize={'medium'}>
                  {course.offeredCourse.course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.offeredCourse.course.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Link to={`deliverable/${course.offeredCourse.course.name}/${course.offeredCourse.course.id}`} size="small" color="primary" className=' text-blue-500 p-2 hover:text-mainBlueColor'>
              Open
            </Link>
          </CardActions>
        </Card>
      </div >
    ))
  )
}
