import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Create from "./components/Create";
import DashBoard from "./components/DashBoard";
import { Switch, Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Create} />
          <Route path="/dash" component={DashBoard} />
        </Switch>
      </div>
    );
  }
}
