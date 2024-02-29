import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LearnMore from "./LearnMore";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/learn-more/:id" component={LearnMore} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
