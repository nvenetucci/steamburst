import React, { Component } from "react";
import CurrentPlayers from "../CurrentPlayers";
import SteamDetails from "../SteamDetails";
import TwitchDetails from "../TwitchDetails";
import DealDetails from "../DealDetails";
import NavBar from "../NavBar";

class AppDetails extends Component {
  render() {
    return (
      <div className="AppDetails">
        <NavBar />
        <SteamDetails appid={this.props.match.params.appid} />
        <CurrentPlayers appid={this.props.match.params.appid} />
        <TwitchDetails
          appname={this.props.getNameById(this.props.match.params.appid)}
        />
        <DealDetails appid={this.props.match.params.appid} />
      </div>
    );
  }
}

export default AppDetails;
