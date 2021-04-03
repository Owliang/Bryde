import React from "react"
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
        margin: 'auto',
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
        minHeight: '150px',
        minWidth: '260px',
        maxWidth: '260px',
        maxHeight: '150px',
        
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
    const course = data.courses.find((x) => x.id === props.match.params.id);
    if(!course){
        return <dic>Course Not Found</dic>
    }
    return (
      <Container fixed>
        <img src={course.img} alt={course.name} />
        <Typography className={classes.typography}>Course Name : { course.name }</Typography>
        <Typography className={classes.typography}>Teach by : { course.tutor }</Typography>
        <Typography className={classes.typography}>price : { course.price }</Typography>
      </Container>
    )
}