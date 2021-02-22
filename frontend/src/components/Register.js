import React , { Component, useState } from "react";


export default class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          repassword: "",
          fname: "",
          lname: "",
          ppnumber: "",
          isTutor : false
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.name === 'isTutor' ? target.checked : target.value;
        const name = target.name;
        if(name == 'fname' || name == 'lname' ){
            value = value.toUpperCase();
        }
        this.setState({
          [name]: value    });
    }

    handleNameChange(event) {
        this.setState({value: event.target.value.toUpperCase()});}

    render(){
        return(
            <div >
                
                    <form >
                        <div className="form-group">
                            <br />
                            <label >Register</label>
                            <input type="text" class="form-control" placeholder="Username" name="username" required/> <br/>
                            <input type="password" class="form-control" placeholder="Password" name="password" required/> <br/>
                            <input type="password" class="form-control" placeholder="Confirm - Password" name="repassword" required/><br/>
                            <input type="text" class="form-control" placeholder="First Name" name="fname" required/><br/>
                            <input type="text" class="form-control" placeholder="Last Name" name="lname" required/><br/>
                            <input type="text" class="form-control" placeholder="Prompt Pay Number" name="ppnumber" required/><br/>
                            <input type="checkbox"  name="isTutor" checked={this.state.isTutor}/> Register As Tutor<br/><br/>
                            <label >Upload your picture</label>
                            
                            <input type="file" class="form-control-plaintext"  id="formFile"/>
                        </div>
                        <div class="text-center">
                            <input class="btn btn-dark col-6 mx-auto" type="submit" value="Register" />
                        </div>
                        
                    </form>
            </div>       
                  
            
        )
    }
}

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// object schema สำหรับทำ validation
const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    password: Yup.string()
        .min(3, 'Please Enter more then 3 letters')
        .required('This field is required.'),
    rePassword: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.')
        //check is password match ?
        .test('passwords-match', 'Password not match.', function (value) {
            return this.parent.password === value;
        }),
    fname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    lname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    ppnumber: Yup.string()
        .min(, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    
});

function RegisterForm() {
  return (
    <div>
      <div className="row justify-content-center" style={styles.row}>
         <div className="col-md-3">
            <div className="row justify-content-center">
               <div className="col-md-12" style={styles.txt1}>
                  REGISTER
               </div>
               <div className="col-md-12">
                   
                  // ส่วนของ formik
                  <Formik
                     initialValues={{ //กำหนด initialValues
                       name: '',
                       email: '',
                       password: '',
                       confirmPassword: ''
                     }}
                     validationSchema={RegisterSchema} //กำหนด validationSchema
                     onSubmit={values => {
                        console.log(values);
                      }}
                   >
                   {({ errors, touched }) => ( //ตรวจสอบว่ามีการ touch หรือ error หรือไม่
                       <Form>
                         // ช่องสำหรับกรอก fname
                         <div className="form-group">
                             <label htmlFor="fname" style={styles.txt2}>
                                First name
                             </label>
                             <Field
                                name="fname"
                                type="text"
                                //เงื่อนไขในการแสดงผล css
                                className={`form-control ${touched.fname ? errors.fname ? 'is-invalid' : 'is-valid' : ''}`}
                                id="fname"
                                placeholder="Enter First name"
                              />
                              // แสดง Error Message
                              <ErrorMessage component="div" name="fname" className="invalid-feedback" />
                        </div>

                        // ช่องสำหรับกรอก lname
                         <div className="form-group">
                             <label htmlFor="lname" style={styles.txt2}>
                                Last name
                             </label>
                             <Field
                                name="lname"
                                type="text"
                                //เงื่อนไขในการแสดงผล css
                                className={`form-control ${touched.lname ? errors.lname ? 'is-invalid' : 'is-valid' : ''}`}
                                id="lname"
                                placeholder="Enter Last name"
                              />
                              // แสดง Error Message
                              <ErrorMessage component="div" name="lname" className="invalid-feedback" />
                        </div>
                        
                        // ช่องสำหรับกรอก Username
                        <div className="form-group">
                              <label htmlFor="username" style={styles.txt2}>
                                 Username
                              </label>
                              <Field
                                 name="username"
                                 type="text"
                                 //เงื่อนไขในการแสดงผล css
                                 className={`form-control ${touched.username ? errors.username ? 'is-invalid' : 'is-valid' : ''}`}
                                 id="username"
                                 placeholder="Enter Username"
                              />
                              // แสดง Error Message
                              <ErrorMessage component="div" name="username" className="invalid-feedback" />
                        </div>
                        
                        //ช่องสำหรับกรอก password
                        <div className="form-group">
                              <label htmlFor="password" style={styles.txt2}>
                                 Password
                              </label>
                              <Field 
                                 name="password"
                                 type="password"
                                 // เงื่อนไข css
                                 className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                                 id="password"
                                 placeholder="Password"
                              />
                              // แสดง Error Message
                              <ErrorMessage component="div" name="password" className="invalid-feedback" />
                         </div>
                         
                         //ช่องสำหรับกรอก Confirm Password
                         <div className="form-group">
                              <label htmlFor="repassword" style={styles.txt2}>
                                 Confirm Password
                              </label>
                              <Field
                                 name="repassword"
                                 type="password"
                                 //เงื่อนไขแสดง css
                                 className={`form-control ${touched.repassword ? errors.repassword ? 'is-invalid' : 'is-valid' : ''}`}
                                 id="repassword"
                                 placeholder="Enter Confirm Password"
                               />
                               // แสดง Error Message
                               <ErrorMessage component="div" name="repassword" className="invalid-feedback" />
                         </div>
                         <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                        </Form>
                       )}
                     </Formik>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default RegisterForm;