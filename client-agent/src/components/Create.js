import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import axios from "axios";
import uuidv1 from "uuid/v1";
export default class Create extends Component {
  onPressed = e => {
    let user = uuidv1();
    localStorage.setItem("userData", user);
    axios
      .post("https://easyq-backend.herokuapp.com/makeAgent", {
        id: user
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.props.history.push("/dash");
  };
  componentDidMount() {
    if (localStorage.getItem("userData")) {
      this.props.history.push("/dash");
    }
  }
  render() {
    return (
      <Container className="center-div">
        <Button
          color="primary"
          className="createBut"
          onClick={this.onPressed}
          type="submit"
        >
          Create new agent
        </Button>
      </Container>
    );
  }
}
