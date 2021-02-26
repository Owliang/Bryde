import React , { Component, useState , useCallback } from "react";
import styled from 'styled-components'
import http from "../http-common";
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    //background: "black"
  },
  input: {
    color: "white"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const roles = [
    {
      value: true,
      label: 'Tutor',
    },
    {
      value: false,
      label: 'Student',
    },
  ];

  const ValidationTextField = withStyles({
    root: {
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    },
  })(TextField);
  
  
const ppnumberFormat = /^[0-9]{10,13}$/

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    password: Yup.string()
        .min(3, 'Please Enter more then 3 letters')
        .required('This field is required.'),
    repassword: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    lname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    ppnumber: Yup.string()
        .min(8, 'Too Short!')
        .max(14, 'Too Long!')
        .required('This field is required.')
        .test('ppnumber-valid', 'Prompt Pay number Invalid.', function (value) {
            return value == null ? true : value.match(ppnumberFormat,'Prompt Pay number Invalid');
        }),
    isTutor: Yup.bool()

    
});

function RegisterForm({ isLogin, onLoginChange }) {

    const classes = useStyles();

    const [role, setRole] = React.useState(false);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleLoginChange = useCallback(event => {
      onLoginChange(true)
      //alert(`${isLogin}Is in`);
    }, [onLoginChange])

    const handleLogoutChange = useCallback(event => {
      onLoginChange(false)
    }, [onLoginChange])
  

    const formik = useFormik({
        initialValues:{ //กำหนด initialValues
            username: '',
            fname: '',
            lname: '',
            password: '',
            repassword: '',
            ppnumber: '',
            isTutor: false
          },
          validationSchema: RegisterSchema, //กำหนด validationSchema
          onSubmit: async (values) => {
             //await new Promise(resolve => setTimeout(resolve, 2000));
             axios
                 .post("http://localhost:4000/register", values, { crossdomain: true })
                 .then(response => {
                     //console.log("response: ", response)
                     var isSuccess = response.data.result;
                     if(isSuccess){
                      handleLoginChange();
                      alert(`You are Loged In !!!`);
                      window.location.href = "/course";
                     }else{
                      alert(`Register Failed\n${response.data.error}`);
                     }
                     //alert(JSON.stringify(response, null, 2));
                 })
                 .catch(err => {
                     console.error(err)
                 })
           }
      });

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit} >
        <FormLabel component="legend" >Register</FormLabel>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
          variant="filled" 
          
        />
        <br/>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          variant="filled" 
        />
        <br/>
        <TextField
          fullWidth
          id="repassword"
          name="repassword"
          label="Confirm Password"
          type="password"
          value={formik.values.repassword}
          onChange={formik.handleChange}
          error={formik.touched.repassword && Boolean(formik.errors.repassword)}
          helperText={formik.touched.repassword && formik.errors.repassword}
          margin="normal"
          variant="filled" 
        />
        <br/>
        <ValidationTextField
          fullWidth
          className={classes.margin}
          id="fname"
          name="fname"
          label="First Name"
          type="text"
          value={formik.values.fname}
          onChange={formik.handleChange}
          error={formik.touched.fname && Boolean(formik.errors.fname)}
          helperText={formik.touched.fname && formik.errors.fname}
          margin="normal"
          variant="filled" 
        />
        <br/>
        <TextField
          fullWidth
          id="lname"
          name="lname"
          label="Lastname"
          type="text"
          value={formik.values.lname}
          onChange={formik.handleChange}
          error={formik.touched.lname && Boolean(formik.errors.lname)}
          helperText={formik.touched.lname && formik.errors.lname}
          margin="normal"
          variant="filled" 
        />
        <br/>
        <TextField
          fullWidth
          id="ppnumber"
          name="ppnumber"
          label="Prompt Pay Number"
          type="text"
          value={formik.values.ppnumber}
          onChange={formik.handleChange}
          error={formik.touched.ppnumber && Boolean(formik.errors.ppnumber)}
          helperText={formik.touched.ppnumber && formik.errors.ppnumber}
          margin="normal"
          variant="filled" 
        />
        <br/>
        <TextField
          name="isTutor"
          id="select-role"
          select
          label="Select Role"
          value={formik.values.isTutor}
          onChange={formik.handleChange}
          helperText="Please select your Role"
          variant="filled"
          onBlur = {formik.handleBlur('isTutor')} 
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br/>
        <Button color="primary" variant="contained" fullWidth type="submit" >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;