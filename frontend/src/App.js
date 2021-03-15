import React, { Component, createContext, useState, useContext, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Container, Box } from '@material-ui/core'
import CourseList from './components/course/CourseList'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
  return (
    <div>
      <Navbar />
      <Box bgcolor="background.dark">
        <Container maxWidth="lg">
          <Box bgcolor="background.dark" height='100vh'> 
            <Router>
              <Switch>
                <Route path="/courses">
                  <CourseList/>
                </Route>
                <Route path="/">
                  <Landing />
                </Route>
              </Switch>
            </Router>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default App;