import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

export default function CardCourses({ data }) {

  return (

    data.map((item, index) => (
      <div className='shadow-md hover:border rounded-md hover:border-red-400 shadow-red-400' key={index} >

        <Card sx={{ maxWidth: 'auto' , width: '100%', margin: 'auto'}} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.course.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button size="small" color="primary" className='hover:text-gray-400'>
              Open
            </Button>
          </CardActions>
        </Card>
      </div>
    ))
  )
}
