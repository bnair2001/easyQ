import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light">
          <div className="navbar-header">
            <NavbarBrand className="brand">easy<strong>Q</strong></NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}
