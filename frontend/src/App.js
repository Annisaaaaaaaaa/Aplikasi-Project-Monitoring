import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'
import { MyNav } from './views/Nav'
import { Banner } from './views/Banner'
// import Projek from './component/Com_project'
// import Sidebar from './component/Com_sidebar'
// import Project from './views/Project'

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* < Navbar/> */}
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />
          {/* <Route component={Sidebar} path="/sidebar"/> */}
          {/* <Route component={Project} path="/project"/> */}
          {/* <Route component={Registerpage} path="/register" exact /> */}
          <Route component={Home} path="/" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <MyNav />
      <Banner />
      {/* <Features />
      <Projects /> */}
    </div>
  ); 
}

export default App