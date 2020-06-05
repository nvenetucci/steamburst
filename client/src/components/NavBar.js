import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";
import steam_logo from "../assets/steam_logo.png";

class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          STEAM BURST
          <img
            className={"img-fluid pl-2 pb-1"}
            style={{ width: "2.5rem" }}
            src={steam_logo}
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <SearchBar prevTerm={this.props.prevTerm} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
