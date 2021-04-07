import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, ListItem, Paper, Typography , Button , Select ,MenuItem ,FormControl,InputLabel} from '@material-ui/core'
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
    coursedetail: {
        color: '#FFFFFF',
        marginLeft:'3rem',
        marginTop:'auto',
        marginBottom:'auto',
        variant:'h6'
    },
    grid: {
        height: '100%',
        padding : '1rem',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
    ButtonBlock: {
        display:'flex',
        justifyContent:'flex-end',
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
    qrcode:{
        marginTop: '2rem',
        maxWidth: '25rem',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    },
    courseText:{
        align: 'center'
    },
    margin:{
        marginTop:'2rem',
        marginBottom:'2rem',
        marginLeft:'1rem',
        marginRight:0
    },
    Button:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        marginLeft: '3rem',
        marginTop: '1rem',
        color:'primary',
        width:'10rem',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    }
}));

export default function Lesson(props) {

    const classes = useStyles();
    const [course,setCourse] = useState([]);

    useEffect(() => {
        const fecthCourse = async () => {
            const { data } = await axios.get('/course',{params:{
                id : props.match.params.id,
                student_name : localStorage.getItem('username')
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
                    <Typography className={classes.coursedetail} >By : { course.tutor }</Typography>
                    <Typography className={classes.coursedetail} >Subject : { course.subject }</Typography>
                    <Typography className={classes.coursedetail} >Price : { course.price } Baht</Typography>
                    <Typography className={classes.coursedetail} >Rating : { course.rating }</Typography>
                    <Typography className={classes.coursedetail} >Number of Video : { course.video_size }</Typography>

                </div>
                <div className={classes.margin} >
                    <Typography className={classes.typography} variant='h6'>Description :</Typography>
                    
                </div>
                    <Typography className={classes.coursedetail}  > {course.description} </Typography>
                
            </div>
        </Paper>
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
                <Select fullWidth className={classes.dropdown}  >
                    <MenuItem value={'0'}>clip 1</MenuItem>
                    <MenuItem value={'1'}>clip 2</MenuItem>
                    <MenuItem value={'2'}>clip 3</MenuItem>
                    <MenuItem value={'3'}>clip 4</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} > Download course material </Button>
            </Grid>
        </Grid>





        {localStorage.getItem('role') === 'tutor' &&
            <Typography className={classes.typography}>Enrolled students</Typography>
        }
        

      </Container>
    )
}