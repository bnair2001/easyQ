import React, { Component } from "react";
import Switch from "react-switch";
import { Alert, Container, Button } from "reactstrap";

var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

export default class Cancelled extends Component {
  state = {
    verified: false,
    checked: false
  };

  handleChange = checked => {
    if (checked === true) {
      localStorage.removeItem("outbank");
    } else {
      localStorage.setItem("outbank", checked);
    }

    this.setState({ checked: checked, verified: checked });
  };
  render() {
    return (
      <Container>
        <Alert color="danger">
          Access Denied!
          <br /> Possible reasons:
          <br /> Your ticket was cancelled outside the bank, return to the bank
          to create a new one.
          <br /> You cannot create the ticket if you are outside the bank.
        </Alert>
        {this.state.verified && (
          <Button color="link">
            <a href="/">Click here now</a>
          </Button>
        )}
        <div>
          <div style={phantom} />
          <div style={style}>
            {this.state.checked && <h6>Inside the bank now</h6>}
            {!this.state.checked && <h6>Outside the bank now</h6>}
            <Switch onChange={this.handleChange} checked={this.state.checked} />
          </div>
        </div>
      </Container>
    );
  }
}
