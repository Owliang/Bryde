import React, { Component, createContext, useState, useContext, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { Container, Box } from '@material-ui/core'
import CourseList from './components/Course/CourseList'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import CreateCourse from './Createcourse'
import CreateQuestion from './CreateQuestion'
import CourseVideo from './CourseVideo'
import EditCourse from "./EditCourse"
import Home from './components/Home/Home'
import MyCourses from './MyCourses'
import MyCourseStu from './MyCoursesStu'


function App() {

    const auth = localStorage.getItem('auth') == 'true' ? true : false

    // use this instead of Route
    // if not login (auth is false), PrivateRoute will redirect to Landing page
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            render={(props) => (
                auth ? <Component {...props} /> : <Redirect to='/' />
            )}
            {...rest}
        />
    )

    // if already login, redirect to home. if not, show login page
    const LoginRoute = ({ component: Component, ...rest }) => (
        <Route
            render={(props) => (
                auth ? <Redirect to='/home' /> : <Component {...props} />
            )}
            {...rest}
        />
    )

    return (
        <div>
            {auth && <Navbar />}
            <Container maxWidth="lg">
                <Box height='100vh'> 
                    <Router>
                        <Switch>
                            <PrivateRoute path='/create_course' component={CreateCourse} />
                            <PrivateRoute path='/create_question' component={CreateQuestion} />
                            <PrivateRoute path='/edit_course' component={EditCourse} />
                            <PrivateRoute path='/course_video' component={CourseVideo} />
                            <PrivateRoute path='/courses' component={CourseList} />
                            <PrivateRoute path='/home' component={Home}/>
                            <PrivateRoute path='/mycourses' component={MyCourses}/>
                            <PrivateRoute path='/mycoursesstu' component={MyCourseStu}/>
                            <LoginRoute path="/" component={Landing} />
                            <Route path='/courses' component={CourseList} />
                        </Switch>
                    </Router>
                </Box>
            </Container>
        </div>
    );
}

export default App;