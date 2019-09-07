import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import DashBoard from "./components/DashBorad";
import Cancel from "./components/Cancelled";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/dash" component={DashBoard} />
            <Route path="/cancelled" component={Cancel} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
