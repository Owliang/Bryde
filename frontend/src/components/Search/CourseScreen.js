import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography , Button } from '@material-ui/core'
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

export default function CourseScreen(props) {

    const classes = useStyles();
    const [course,setCourse] = useState([]);
    const [QRcode,setQRcode] = useState([]);
    const [showQRcode,setShowQRcode] = useState(false);

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

    const fecthQRcode = async () => {
        const { data } = await axios.post('/payment',{
            tutor: course.tutor,
            price : course.price
            });
        setQRcode( data.data );    
        };
        
    const enroll = async () => {
        const {data} = await axios.post('/payment/done',{
            id: props.match.params.id,
            username: localStorage.getItem('username')
            });  
        };


    const handleEnroll = () => {
        fecthQRcode();
        setShowQRcode(true);
        console.log(QRcode);
        
      };
    

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
    
        <div className={classes.ButtonBlock} >
        {localStorage.getItem('role') === 'Tutor' ? 
            <br/>
            :
            course.Isenroll === true ? <br/> : showQRcode === false ?
                    
                    <Button variant="outlined" align='end' color="primary" className={classes.Button} onClick={() => {handleEnroll()}} >enroll</Button>
                    :
                    <Button variant="outlined" align='end' color="primary" className={classes.Button} onClick={enroll()} href='/' >done</Button>
                }
        <Button variant="outlined" align='end' color="primary" className={classes.Button}  href='/' >back</Button>

        </div>
        {course.Isenroll === true &&
            <Typography className={classes.typography} >You've already enrolled in this class</Typography>
            
            
        }
        {localStorage.getItem('role') === 'Tutor' &&
            <Typography className={classes.typography} >Tutor cannot enroll to any course </Typography>
        }


        {showQRcode === true &&
            <div className='row' display='flex' justifyContent='justify-center'>
                
                <img src={'data:image/jpg;base64,'+ QRcode.qr} className={classes.qrcode} align= 'center' />
                
            </div>
                    }
        

      </Container>
    )
}