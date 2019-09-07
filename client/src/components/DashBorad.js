import React, { Component } from "react";
import { Container, Button, Alert } from "reactstrap";
import Switch from "react-switch";
import { slideInDown, slideInRight, slideInLeft } from "react-animations";
import Radium, { StyleRoot } from "radium";
import axios from "axios";
import firebase from "firebase";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";

const styles = {
  slideInDown: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInDown, "slideInDown")
  },
  slideInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInRight, "slideInRight")
  },
  slideInLeft: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInLeft, "slideInLeft")
  }
};

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

const config = {
  apiKey: "AIzaSyBB4Y_uqwhOkP_uwcZeBzeceShwotav4FQ",
  authDomain: "easyq-736b7.firebaseapp.com",
  databaseURL: "https://easyq-736b7.firebaseio.com",
  projectId: "easyq-736b7",
  storageBucket: "easyq-736b7.appspot.com",
  messagingSenderId: "247413441634",
  appId: "1:247413441634:web:943351990684e882"
};

export default class DashBorad extends Component {
  state = {
    docid: "",
    ticket: {},
    verified: true,
    checked: true
  };
  async componentDidMount() {
    document.querySelector("#invis").click();
    if (localStorage.getItem("firstload")) {
      window.location.replace("https://client-2.netlify.com/");
      localStorage.removeItem("firstload");
    }

    if (localStorage.getItem("docID")) {
      this.setState({ docid: localStorage.getItem("docID") });
    } else {
      this.props.history.push("/");
    }

    let docid = localStorage.getItem("docID");
    console.log(docid);
    let data = await axios.post(
      "https://easyq-backend.herokuapp.com/getTicketById",
      {
        id: docid
      }
    );
    this.setState({ ticket: data.data });

    // let ve = await axios.get("http://localhost:3001/verify");
    // if (ve) {
    //   this.setState({ verified: ve.data.verified });
    // } else {
    //   this.setState({ verified: false });
    // }
  }
  handleCancel = async () => {
    try {
      await axios.post("https://easyq-backend.herokuapp.com/cancelTicket", {
        id: localStorage.getItem("docID")
      });
    } catch (error) {
      console.log(error.message);
    }
    localStorage.clear();
    if (this.state.verified) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/cancelled");
    }
  };

  handleChange = checked => {
    this.setState({ checked });
    this.setState({ verified: checked });
  };
  vibration = () => {
    navigator.vibrate([1000, 500, 1000]);
  };
  clickButton() {
    document.querySelector("#invis").click();
  }
  render() {
    return (
      <StyleRoot>
        {!this.state.verified && (
          <div className="location">You are now outside the bank.</div>
        )}

        <Button
          color="light"
          id="invis"
          className="alerty"
          onClick={this.vibration}
        >
          <img src="/bell.png" height="30px" width="30px" alt="alert"></img>
        </Button>
        <Container className="inputForm">
          <div className="test" style={styles.slideInDown}>
            <h2>Waitlist</h2>

            <FirebaseDatabaseProvider firebase={firebase} {...config}>
              <FirebaseDatabaseNode path="max/">
                {d => {
                  if (this.state.ticket.id - d.value === 2) {
                    return (
                      <div>
                        {this.clickButton()}
                        <div className="circle">
                          {this.state.ticket.id - d.value}
                        </div>
                        <Alert color="success" className="succ">
                          Your turn is coming soon
                        </Alert>
                      </div>
                    );
                  } else if (this.state.ticket.id - d.value === 1) {
                    return (
                      <div>
                        {this.clickButton()}

                        <div className="circle">
                          {this.state.ticket.id - d.value}
                        </div>
                        <Alert color="success" className="succ">
                          Your turn is coming soon
                        </Alert>
                      </div>
                    );
                  } else if (this.state.ticket.id - d.value === 0) {
                    if (this.state.verified) {
                      return (
                        <div>
                          {this.clickButton()}

                          <div className="circle">
                            {this.state.ticket.id - d.value}
                          </div>
                          <Alert color="success" className="succ">
                            It's your turn now!
                          </Alert>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <div className="circle">
                            {this.state.ticket.id - d.value}
                          </div>
                          <Alert color="danger" className="succ">
                            Sorry, Your ticket is cancelled!
                          </Alert>
                          {this.handleCancel}
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div>
                        <div className="circle">
                          {this.state.ticket.id - d.value}
                        </div>
                      </div>
                    );
                  }
                }}
              </FirebaseDatabaseNode>
            </FirebaseDatabaseProvider>
          </div>
          <div className="test" style={styles.slideInRight}>
            <h5 className="head">Token</h5>
            <div className="circle2">{this.state.ticket.id}</div>
          </div>
          <div className="rectangle" style={styles.slideInLeft}>
            {this.state.ticket.first} {this.state.ticket.last}
            <br />
            {this.state.ticket.mobile}
          </div>
          {/* <Button
            color="dark"
            className="cancelbut"
            onClick={() => window.open("http://easyq.rf.gd/game/", "_blank")}
          >
            Play Game
          </Button> */}
          <iframe
            id="myFrame"
            className="game"
            src="https://flappy-dog.netlify.com"
            width="310"
            height="415"
          ></iframe>
          <div>
            <Button
              color="danger"
              className="cancelbut"
              onClick={this.handleCancel}
            >
              Cancel Ticket
            </Button>
          </div>
        </Container>

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
