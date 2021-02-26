import React , { Component,createContext, useState, useContext,useEffect,useCallback  } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Register from './components/Register'
import Header from './components/Header'
import HeaderLogout from './components/HeaderLogout'
import PrimarySearchAppBar from './components/HeaderMat'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import { Container, Typography, Box } from '@material-ui/core'
import CourseList from './components/Course/CourseList'

const UserContext = createContext();

function User({ children }) {
  const userState = useState(localStorage.getItem(4) ||
  {
    name: null,
    email: null,
    isLogin: false
  });

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

function App() {

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem(4, isLogin);
    console.log(`"Change user",${isLogin}`)
  }, [4, isLogin]);

  const [isLogin, setIsLogin] = React.useState(
    localStorage.getItem(3) || false
  );

  useEffect(() => {
    localStorage.setItem(3, isLogin);
    console.log(`"Change Local",${isLogin}`)
  }, [3, isLogin]);

  console.log(`"start app",${isLogin}`)

  document.title = isLogin;

  return (
    <div>
      {console.log(`"return app",${isLogin}`)}
      {isLogin ? (<HeaderLogout isLogin={isLogin} onLogoutChange={setIsLogin.bind(this)}/>) : (<Header/>)}
      <Box bgcolor="#FFFFFF">
      <Container maxWidth="lg">
        <Box bgcolor="#FFFFFF" style={{ height: '100vh' }}>
          <Router>
            <Switch>
              <Route path="/register">
                <Register isLogin={isLogin} onLoginChange={setIsLogin.bind(this)}/>
              </Route>
              <Route path="/login" >
                <Login isLogin={isLogin} onLoginChange={setIsLogin.bind(this)}/>
              </Route>
              <Route path="/Course">
                <CourseList/>
              </Route>
              <Route path="/">
                <h5 align = "center">header</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus efficitur massa, fringilla feugiat risus facilisis sed. Quisque quis lacinia sem, in ultricies quam. Nunc id mauris euismod, fringilla enim a, ornare nisi. In hac habitasse platea dictumst. Quisque dapibus nisl turpis, vel imperdiet turpis sagittis a. Donec tellus lectus, suscipit vel sapien placerat, pulvinar commodo orci. Quisque porta mollis neque fermentum blandit. Morbi interdum eros neque, quis lacinia nunc elementum non.</p>
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

// export default function App() {
//   return (
//     <Router>
//       <div>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>

//         <Switch>
//           <Route path="/about">
//             <h2>About</h2>
//           </Route>
//           <Route path="/register">
//             <Register/>
//           </Route>
//           <Route path="/">
//             <h2>Home</h2>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }
