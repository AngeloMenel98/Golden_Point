import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Paths,
} from "react-router-dom";
import App from "../App";

const Routes: React.FC = () => {
  return (
    <Router>
      <Paths>
        <Route path="/" element={<App />} />

        {/*<Route path="/about" component={About} />

        <Route path="/contact" component={Contact} />

  <Route component={NotFound} />*/}
      </Paths>
    </Router>
  );
};

export default Routes;
