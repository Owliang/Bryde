import React , { Component, useState, useCallback } from "react";
import styled from 'styled-components'
import http from "../http-common";
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

function Login({ isLogin, onLoginChange }) {

    const classes = useStyles();

    const [role, setRole] = React.useState(false);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleLoginChange = useCallback(event => {
      onLoginChange(true)
    }, [onLoginChange])

    const handleLogoutChange = useCallback(event => {
      onLoginChange(false)
    }, [onLoginChange])

    const formik = useFormik({
        initialValues:{ //กำหนด initialValues
            username: '',
            password: '',
          },
          onSubmit: async (values) => {
            //await new Promise(resolve => setTimeout(resolve, 2000));
            axios
                .post("http://localhost:4000/login", values, { crossdomain: true })
                .then(response => {
                    // console.log("response: ", response)
                    var isSuccess = response.data.result;
                    if(isSuccess){
                      handleLoginChange();
                      alert(`You are Loged In !!!`);
                      window.location.href = "/course";
                    }else{
                      alert(`Log In Failed\n${response.data.error}`);
                    }
                    //alert(JSON.stringify(response, null, 2));
                })
                .catch(err => {
                    alert(`Error Catch${err}`);
                    console.error(err)
                })
            //console.log("HELLOLOLOLOLOLOLO")
           }
      });

    return (
        <div >
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <FormLabel component="legend" my={4} >Login</FormLabel>
                
                <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                 onChange={formik.handleChange}
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
                margin="normal"
                variant="filled" 
                />

                <Button variant="contained" color="primary" fullWidth type="submit" >Sign in</Button>
                <Button variant="contained" color="primary" href="/register" fullWidth>Sign up</Button>

            </form>
        </div>       
    )
}

export default Login

// export default class Login extends Component{
    
//     render(){
//         return(
            // <div >
                
            //         <form>
            //             <div className="form-group">
            //                 <label >Sign In</label>
            //                 <input type="text" class="form-control" placeholder="Username" name="username" required/> <br/>
            //                 <input type="password" class="form-control" placeholder="Password" name="password" required/> <br/>
            //             </div>

            //             <div class="text-center">
            //                 <input class="btn btn-dark col-6 mx-auto" type="submit" value="Sign In"/>
            //                 <a class="btn btn-dark col-6 mx-auto" type="button" value="Sign Up" href="/register" >Sign Up </a>
            //             </div>
                        
            //         </form>
            // </div>       
//         )
//     }
// }