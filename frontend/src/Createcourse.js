import React, { useEffect, useState} from 'react'
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CourseForm from './components/Course/CourseForm';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(5),
        margin : theme.spacing(3),
        color: theme.palette.text.secondary,
        backgroundColor: '#424242',
        borderRadius: 15
    },
}))

export default function Employees() {

    const classes = useStyles();
    const [tutor,setTutor] = useState();
    
    useEffect(() => {
        try {
          var username = localStorage.getItem('username')
          var role = localStorage.getItem('role')
          console.log(JSON.stringify({name:username, role:role}))
          if(role != 'Tutor'){
            window.alert('!!!! HOW DID YOU GET IN HERE KIDS !!!!')
            window.location.href = "/";
          }
          setTutor(username)
        }catch{
          /*setAlert({
            ...alert,
            message: "Please Login First",
            open: true,
          })*/
          window.location.href = "/";
        }
      }, [1]);

    return (
        <Grid
        container
        //direction="column"
        justify="flex-start"
        alignItems="flex-start"
        >
          
            <Grid item xs={12}>
                <Typography variant="h2" color='primary' gutterBottom>
                <Box fontWeight="fontWeightBold" m={1}>
                    Create Course
                </Box>
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Paper className = {classes.paper} variant="outlined" component='div' elevation={3}>
                    <CourseForm className={classes.root} tutor={tutor} noValidate />
                </Paper>
            </Grid>
        </Grid>
    )
}