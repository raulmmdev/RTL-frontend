import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../pages/HomePageContainer";

const MainRouter = () => {
  return (
    <>
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={HomePage} />
          <Route
            path="/:id/episode/season/:season/number/:number"
            component={(props: any) => <HomePage {...props} view="episode" />}
          />
        </div>
      </Router>
    </>
  );
};

export default MainRouter;
