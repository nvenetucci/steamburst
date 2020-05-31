import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          STEAM BURST
        </Navbar.Brand>
        <SearchBar prevTerm={this.props.prevTerm} />
      </Navbar>
    );
  }
}

export default NavBar;
