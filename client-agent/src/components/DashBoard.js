import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import Slider from "react-rangeslider";
import { Emojione } from "react-emoji-render";
import axios from "axios";

export default class DashBoard extends Component {
  state = {
    rating: 0,
    value: 0,
    isCompleted: false,
    ticket: {}
  };

  getTicket = async () => {
    let res;
    try {
      res = await axios.post("https://easyq-backend.herokuapp.com/getTicket", {
        agentId: localStorage.getItem("userData")
      });
    } catch (error) {
      console.log(error.message);
    }
    if (res.data !== {}) {
      console.log(res.data);
      this.setState({ ticket: res.data });
    } else {
      this.setState({ ticket: { empty: true } });
    }
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  onPress = e => {
    localStorage.removeItem("userData");
    this.props.history.push("/");
  };
  componentDidMount() {
    if (!localStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    this.getTicket();
    console.log(this.state);
  }

  handleChange = e => {
    console.log("change");
  };

  handleChangeStart = () => {
    console.log("Change event started");
  };

  handleChange = value => {
    this.setState({
      value: value
    });
  };

  handleChangeComplete = async () => {
    try {
      console.log(this.state.ticket.id);
      await axios.post(
        "https://easyq-backend.herokuapp.com/makeCompleteUpdate",
        {
          rating: this.state.rating,
          mood: this.state.value,
          id: this.state.ticket.tid
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    console.log("Change event completed");
  };

  handleComplete = () => {
    this.setState({ isCompleted: true });
  };

  handleCompleteNext = () => {
    console.log("Next!!");
    this.getTicket();
    this.setState({ rating: 0, value: 0 });
  };
  render() {
    return (
      <div>
        <Container>
          <Button
            color="primary"
            onClick={this.onPress}
            type="submit"
            className="center-div2"
          >
            Logout
          </Button>
          <div className="center-div3">
            <div className="user-details">
              <h5>Token</h5>
              {this.state.ticket.empty && <h5>No one left</h5>}
              <span className="dot">{this.state.ticket.id}</span>
              <h5>{this.state.ticket.first}</h5>
              <h5>{this.state.ticket.purpose}</h5>
            </div>
            <h5 className="heading">Customer rating and mood:</h5>

            <div className="slider">
              <Slider
                min={0}
                max={100}
                value={this.state.value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />

              <Emojione text=":rage:" />
              <Emojione text=":grinning:" className="grin" />
            </div>
            <StarRatingComponent
              className="rating"
              name="rate1"
              starCount={10}
              value={this.state.rating}
              onStarClick={this.onStarClick}
            />
            {!this.state.isCompleted && (
              <Button
                color="primary"
                className="finalBut"
                onClick={this.handleComplete}
              >
                {" "}
                Completed{" "}
              </Button>
            )}
            {this.state.isCompleted && (
              <Button
                color="success"
                className="finalBut"
                onClick={this.handleCompleteNext}
              >
                {" "}
                Next{" "}
              </Button>
            )}
          </div>
        </Container>
      </div>
    );
  }
}
