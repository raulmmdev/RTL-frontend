import * as React from "react";
import "./App.scss";
import Router from "./router/Router";

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}
