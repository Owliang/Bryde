import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, ListItem, Paper, Typography , Button , Select ,MenuItem ,FormControl,InputLabel} from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import data from './data'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({

    title: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
    typography: {
        color: '#FFFFFF',
    },
    grid: {
        height: '100%',
        padding : '1rem',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    paper: {
        padding: theme.spacing(2),

        marginTop:'3rem',
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

        maxWidth: '100%',

        
    },
    courseText:{
        align: 'center'
    },
    margin:{
        marginTop:'1rem',
        marginBottom:'3rem',
        marginLeft:'1rem'
    },
    Button:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        margin: '1rem',
        color:'primary',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    }
}));

export default function CourseScreen(props) {

    const classes = useStyles();
    const [course,setCourse] = useState([]);

    useEffect(() => {
        const fecthCourse = async () => {
            const { data } = await axios.get('/course',{params:{
                id : props.match.params.id,
                student_name : 'ford'
            }    
            });
            setCourse( data.data );
            

            
        };
        fecthCourse();
    },[]);
    if(!course){
        return (
            <Typography variant='h2' align='center' className={classes.typography}>Class Not Found</Typography>
        )

    }
    return (
      <Container fixed>
        <Paper className={classes.paper}>
            <Grid className={classes.margin} >
                <Typography className={classes.typography} variant='h5'>Course Name : { course.name }</Typography>
            </Grid>

            <div className='row'padding='1rem'>
                <div className='col'>
                    <img src={'data:image/jpg;base64,'+ course.photo_buffer } className={classes.courseImage} />
                </div>
                <div className='col'>
                    <Typography className={classes.typography}>By : { course.tutor }</Typography>
                    <Typography className={classes.typography}>Subject : { course.subject }</Typography>
                    <Typography className={classes.typography}>Price : { course.price } Baht</Typography>
                    <Typography className={classes.typography}>Rating : { course.rating }</Typography>
                    <Typography className={classes.typography}>Number of Video : { course.video_size }</Typography>

                </div>
            </div>
        </Paper>
        
        

      </Container>
    )
}