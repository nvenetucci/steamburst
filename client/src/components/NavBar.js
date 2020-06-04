import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";
import steam_logo from "../assets/steam_logo.png"

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          STEAM BURST
          <img  className={"img-fluid pl-3"} style={{width:"3rem"}} src={steam_logo} alt="" />
        </Navbar.Brand>
        <SearchBar prevTerm={this.props.prevTerm} />
      </Navbar>
    );
  }
}

export default NavBar;
