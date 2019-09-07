import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { slideInDown } from "react-animations";
import Switch from "react-switch";
import Radium, { StyleRoot } from "radium";
import axios from "axios";

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

export default class simpleForm extends Component {
  state = {
    first: "",
    last: "",
    email: "",
    mobile: "",
    purpose: "General",
    verified: true,
    checked: true,
    styles: {
      animation: "x 1s",
      animationName: Radium.keyframes(slideInDown, "slideInDown")
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeSelect = e => {
    this.setState({ purpose: e.target.value });
  };
  onSubmit = async event => {
    event.preventDefault();
    const { first, last, email, mobile, purpose } = this.state;
    console.log(this.state);
    let res;
    try {
      res = await axios.post("https://easyq-backend.herokuapp.com/makeTicket", {
        first: first,
        last: last,
        email: email,
        mobile: mobile,
        purpose: purpose
      });
    } catch (error) {
      console.log(error.message);
    }
    console.log(res.data.message);
    localStorage.setItem("docID", res.data.message);
    localStorage.setItem("firstload", true);
    this.props.history.push("/dash");
  };
  async componentDidMount() {
    // localStorage.clear();
    //console.log(localStorage.getItem("inbank"));

    if (localStorage.getItem("outbank")) {
      this.props.history.push("/cancelled");
    }
    if (localStorage.getItem("docID")) {
      this.props.history.push("/dash");
    }
    // try {
    //   let ve = await axios.get("http://localhost:3001/verify");
    //   this.setState({ verified: true });
    //   console.log(ve);
    // } catch (error) {
    //   console.log(error.message);
    //   this.props.history.push("/cancelled");
    // }
  }
  componentDidUpdate() {
    if (!this.state.checked) {
      this.props.history.push("/cancelled");
    }
  }
  handleChange = checked => {
    localStorage.setItem("outbank", checked);
    this.setState({ checked: checked, verified: checked });
  };
  render() {
    return (
      <StyleRoot>
        <div className="test" style={this.state.styles}>
          <Form className="inputForm" onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="first"
                id="first"
                placeholder="Enter first name"
                value={this.state.first}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="last"
                id="last"
                placeholder="Enter last name"
                value={this.state.last}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter mobile number"
                value={this.state.mobile}
                onChange={this.onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="select"
                id="Select"
                placeholder="Purpose"
                value={this.state.purpose}
                onChange={this.onChangeSelect}
                required
              >
                <option>General</option>
                <option>Loans</option>
                <option>Enquiries</option>
                <option>Other</option>
              </Input>
            </FormGroup>

            <Button className="butt">Submit</Button>
          </Form>
        </div>
        <div>
          <div style={phantom} />
          <div style={style}>
            {this.state.checked && <h6>Inside the bank now</h6>}
            {!this.state.checked && <h6>Outside the bank now</h6>}
            <Switch onChange={this.handleChange} checked={this.state.checked} />
          </div>
        </div>
      </StyleRoot>
    );
  }
}
