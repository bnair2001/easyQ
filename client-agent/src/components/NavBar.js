import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light">
          <div className="navbar-header">
            <NavbarBrand className="brand">easyQ</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}
export default Header;
