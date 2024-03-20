import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes as Paths,
} from "react-router-dom"
import Login from "../pages/Login"

const Routes: React.FC = () => {
  return (
    <Router>
      <Paths>
        <Route path="/" element={<Login />} />
      </Paths>
    </Router>
  )
}

export default Routes
