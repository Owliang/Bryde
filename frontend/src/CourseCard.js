import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Button ,Box, withStyles, CardHeader, CardContent, Grid ,Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '80%',
        backgroundColor: '#424242',
        color: 'white',
        padding: theme.spacing(1),

        //fontSize: '100%'
    },
    oldbutton: {
      width: theme.spacing(65),
      height: theme.spacing(5),
      margin: theme.spacing(4),
      backgroundColor: theme.palette.background.main,
      //float: 'right'
      color: '#FFF',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#000',
         },
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
    title: {
      color: '#FFFFFF',
      marginTop: '1rem',
      marginBottom:'1rem'
  },
  typography: {
      color: '#FFFFFF',
  },
  coursedetail: {
      color: '#FFFFFF',
      marginLeft:'3rem',
      
      marginBottom:'auto',
      variant:'h6'
  },
  gridItem: {
      display:'flex',
  },
  textFieldSmall: {
      marginBottom: 8,
  },
  gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
  paper: {
      padding: theme.spacing(2),
      borderRadius:'1rem',
      margin: '1rem',
      background : '#4f4f4f',
      
      
  },
  dropdown: {
      marginBottom: 8,
      height:40,
      "& .MuiOutlinedInput-root": {
          "& fieldset": { 
              borderRadius: "10px",
              borderColor: "primary",
              height: 40,
              marginTop: 5,
          },
          "&.Mui-focused fieldset": {
              borderColor: "primary",
              borderWidth: "2px",
              height: 40,
              marginTop: 5,
          },
      },
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
  },

  courseofweek: {
      height: 'auto',
      padding : theme.spacing(1),
      background: '#9f9f9f',

  },
  courseImage:{
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      
  },
  courseText:{
      align: 'center'
  },
  margin:{
      margin:theme.spacing(1)
  },
  Button:{
      backgroundColor :'#212121',
      border:'1.5px solid',
      bordercolor:'#0EED0E',
      padding: '3px',
      marginButtom: '1rem',
      marginTop:'1rem',
      color:'primary',
      '&:hover': {
          backgroundColor: '#212121',
          boxShadow: 'none',
        },
  },
}))



export default function CourseCard(props){
    
    const classes = useStyles();
    const theme = useTheme(); 
    const {_id, name, tutor, price, subject, desc, rating, student, img, ...other} = props.course
    const defaultImage = 
        "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

    /*const [hasError, setError] = useState(false)
    const [items, setItems] = useState({})


    useEffect(() =>{
      async function fetchData(){
        const res = await fetch('https://randomuser.me/api/')
        res
          .json()
          .then(res => setItems(res))
          .catch(err => setErrors(err));
      }
      fetchData();
      })
    

      return <div>
        {JSON.stringify(items)}
      </div>*/
    
    



    return (
        // <Card className={classes.root}>
        //   <div className={classes.details}>

        //     <Grid container className={classes.root} justify="space-between" alignItems="center">
        //       <Grid item xs={12}>
        //         <Typography component="h5" variant="headline">
        //             {name}
        //         </Typography>
        //       </Grid>
              
        //       <Grid item xs={4}>
        //         <CardMedia className={classes.media}>
        //           <img src={'data:image/jpg;base64,'+ props.course.photo_buffer } width ="160px" hight="160px" />
        //         </CardMedia>
                
        //       </Grid>
              
        //       <Grid item xs={4}>
        //         <CardContent className={classes.content}>
        //           <Typography className={classes.content} variant="subtitle1" color="textSecondary">
        //             {`By Tutor: ${tutor}`}
        //           </Typography>

        //           <Typography className={classes.content} variant="subtitle1" color="textSecondary">
        //             {`Price: ${price}`}
        //           </Typography>

        //           <Typography className={classes.content} variant="subtitle1" color="textSecondary">
        //             {`Subject: ${subject}`}
        //           </Typography>

        //           <Typography className={classes.content} variant="subtitle1" color="textSecondary">
        //             {`Rating: ${rating}`}
        //           </Typography>

        //           <Typography className={classes.content} variant="subtitle1" color="textSecondary">
        //             {`Enrollment: ${student}`}
        //           </Typography>
      
        //         </CardContent>
        //       </Grid>
              
        //       <Grid item xs={4}>
        //         <CardActions>
        //           <Button className={classes.button} size="small" color="primary" href={'/Lesson/'+props.course._id}>
        //             Go to lesson
        //           </Button>
        //           <Button className={classes.button} size="small" color="primary" href={'/create_course/?cid='+props.course._id+ '&mode=edit'} >
        //             Edit Course
        //           </Button>
        //         </CardActions>
        //       </Grid>

        //     </Grid>
            
        //   </div>
        // </Card>

        <Paper className = {classes.paper}>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <img src= {'data:image/jpg;base64,'+ props.course.photo_buffer } className={classes.courseImage}/>
            </Grid>
            <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-start' alignContent='flex-start' >
                <Typography variant="h4" className={classes.coursedetail}> {props.course.name} </Typography>
                <Typography variant="subtitle1" className={classes.coursedetail}>By {props.course.tutor} </Typography>
                <Typography variant="subtitle1" className={classes.coursedetail}>Subject : {props.course.subject} </Typography>
                <Typography variant="subtitle1" className={classes.coursedetail}>Price : {props.course.price} Baht </Typography>
                <Typography variant="subtitle1" className={classes.coursedetail}>Rating : {props.course.rating} </Typography>

            </Grid>
            <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-end' alignContent='flex-end'>
            
                <Button variant="outlined" color="primary" fullWidth className={classes.Button}href={'/Lesson/'+props.course._id}>
                    Go to lesson
                   </Button>
                   <Button variant="outlined" color="primary" fullWidth className={classes.Button} href={'/create_course/?cid='+props.course._id+ '&mode=edit'} >
                     Edit Course
                   </Button>
           
            </Grid>
            
        </Grid>


    </Paper>
    )
}
