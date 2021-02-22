import logo from './logo.svg';
import React , { Component } from "react";
import './App.css';
import Register from './components/Register'
import Header from './components/Header'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <div>
        <Header/>
        <div className="container"> 
          <Router>
            <Switch>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>

              <Route path="/">
                <h2>Home</h2>
              </Route>


            </Switch>
          </Router>
        </div>
      </div>
    );
  }
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
