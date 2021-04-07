import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Button ,Box, withStyles, CardHeader, CardContent, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '80%',
        backgroundColor: '#424242',
        color: 'white',
        padding: theme.spacing(1),
        //fontSize: '100%'
    },
    button: {
      width: theme.spacing(45),
      height: theme.spacing(5),
      margin: theme.spacing(1),
      backgroundColor: '#0EED0E',
      color: '#212121',
      //float: 'right'
    },
    header: {
      color: 'white'
    },
    content: {
      color: 'white'
    },
    media: {
      paddingTop: "30%"
    },
}))

export default function CourseCardStudent(props){
    const classes = useStyles();
    const theme = useTheme(); 
    const {_id, name, tutor, price, subject, desc, rating, student, img, ...other} = props.course
    const defaultImage = 
        "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

    return (
        <Card className={classes.root}>
          <div className={classes.details}>

            <Grid container className={classes.root} justify="space-between" alignItems="center">
              <Grid item xs={12}>
                <Typography component="h5" variant="headline">
                    {name}
                </Typography>
              </Grid>
              
              <Grid item xs={1}>
                <CardMedia className={classes.media}>
                  <img src={'data:image/jpg;base64,'+ props.course.photo_buffer } width ="160px" hight="160px" />
                </CardMedia>
              </Grid>
              
              <Grid item xs={4}>
                <CardContent className={classes.content}>
                  <Typography className={classes.content} variant="subtitle1" color="textSecondary">
                    {`By Tutor: ${tutor}`}
                  </Typography>

                  <Typography className={classes.content} variant="subtitle1" color="textSecondary">
                    {`Price: ${price}`}
                  </Typography>

                  <Typography className={classes.content} variant="subtitle1" color="textSecondary">
                    {`Subject: ${subject}`}
                  </Typography>

                  <Typography className={classes.content} variant="subtitle1" color="textSecondary">
                    {`Rating: ${rating}`}
                  </Typography>

                  <Typography className={classes.content} variant="subtitle1" color="textSecondary">
                    {`Enrollment: ${student}`}
                  </Typography>
      
                </CardContent>
              </Grid>
              
              <Grid item xs={4}>
                <CardActions>
                  <Button className={classes.button} size="small" color="primary">
                    Go to lesson
                  </Button>
                  <Button className={classes.button} size="small" color="primary">
                    Course Materials
                  </Button>
                  
                </CardActions>
              </Grid>

            </Grid>
            
          </div>
        </Card>
    )
}
