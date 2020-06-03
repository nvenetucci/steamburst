import React, { Component } from "react";
import TopDeals from "../TopDeals";
import NavBar from "../NavBar";
import SteamTop100 from "../SteamTop100";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <NavBar />
        <SteamTop100 />
        <br></br>
        <TopDeals getIdByName={this.props.getIdByName} />
      </div>
    );
  }
}

export default Home;
