import React, { Component } from "react";
import TopDeals from "../TopDeals";
import NavBar from "../NavBar";
import SteamTop100 from "../SteamTop100";
import IntroTitle from "../IntroTitle";
import HomeFooter from "../HomeFooter";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <NavBar />
        <IntroTitle />
        <SteamTop100 />
        <br></br>
        <TopDeals getIdByName={this.props.getIdByName} />
        <br></br>
        <br></br>
        <HomeFooter />
      </div>
    );
  }
}

export default Home;
