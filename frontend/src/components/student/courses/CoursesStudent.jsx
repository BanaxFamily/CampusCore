// import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
// import { Link } from 'react-router-dom'

export default function CoursesStudent({data}) {
  return (
    data.map((course, index) => (

      <div className='shadow-md rounded-md hover:shadow-gray-800 ' key={index} >

        {/* <Card sx={{ maxWidth: 'auto', width: '100%', height: '10rem', margin: 'auto' }} >
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
        </Card> */}
      </div>
    ))
  )
}
