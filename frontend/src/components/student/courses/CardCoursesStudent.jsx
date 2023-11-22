import { MoreHoriz } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CardCoursesStudent({ data }) {
  return (
    data.map((course, index) => (

      <div className='shadow-md rounded-md hover:shadow-gray-800 ' key={index} >
        <Card sx={{ maxWidth: 'auto', width: '100%', height: '13rem', margin: 'auto' }} >
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
            title="Teacher name"
            subheader={course.offeredCourse.schedule}
          />
          <CardActionArea>
            <CardContent className='h-[6rem] overflow-y-auto'>
              <Typography gutterBottom variant="h5" component="div">
                {course.offeredCourse.course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.offeredCourse.course.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Link to={`submission`} size="small" color="primary" className=' text-blue-500 hover:text-mainBlueColor'>
              Open
            </Link>
          </CardActions>
        </Card>
      </div >
    ))
  )
}
