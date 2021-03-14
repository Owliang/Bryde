import React, { Component, createContext, useState, useContext, useEffect, useCallback  } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import './index.css';
import { Container, Box } from '@material-ui/core'
import CourseList from './components/course/CourseList'

function App() {
  return (
    <div>
      <Navbar />
      <Box bgcolor="background.dark">
        <Container maxWidth="lg">
          <Box bgcolor="background.main" style={{ height: '100vh' }}>
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