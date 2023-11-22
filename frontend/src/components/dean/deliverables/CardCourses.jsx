import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../utils/AuthContext'

export default function CardCourses({ data }) {
  const {setCourseName} = useAuth()
  return (

    data.map((item, index) => (
      <div className='shadow-md rounded-md hover:shadow-gray-800 '  key={index} >

        <Card sx={{ maxWidth: 'auto' , width: '100%', height: '10rem', margin: 'auto'}} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{justifyContent: 'flex-end'}}>
            <NavLink to={`${item.name}/deliverables/${item.id}`} onClick={() => setCourseName(item.name)} size="small" color="primary" className=' text-blue-500 hover:text-mainBlueColor'>
              Open
            </NavLink>
          </CardActions>
        </Card>
      </div>
    ))
  )
}
