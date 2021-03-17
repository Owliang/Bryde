import React, { Component, createContext, useState, useContext, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { Container, Box } from '@material-ui/core'
import CourseList from './components/Course/CourseList'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import AddCourse from "./components/AddCourse"

function App() {
                <Route path="/AddCourse">
                  <AddCourse />
                </Route>

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

    const LoginRoute = ({ component: Component, ...rest }) => (
        <Route
            render={(props) => (
                auth ? <Redirect to='/courses' /> : <Component {...props} />
            )}
            {...rest}
        />
    )

    return (
        <div>
            {auth && <Navbar />}
            <Box bgcolor="background.dark">
                <Container maxWidth="lg">
                    <Box bgcolor="background.dark" height='100vh'> 
                        <Router>
                            <Switch>
                                <PrivateRoute path='/addcourses' component={AddCourse} />
                                <PrivateRoute path='/courses' component={CourseList} />
                                <LoginRoute path="/" component={Landing} />
                                <Route path='/courses' component={CourseList} />
                            </Switch>
                        </Router>
                    </Box>
                </Container>
            </Box>
        </div>
    );
}

export default App;