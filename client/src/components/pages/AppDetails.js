import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import CurrentPlayers from "../CurrentPlayers";
import SteamDetails from "../SteamDetails";
import TwitchDetails from "../TwitchDetails";
import DealDetails from "../DealDetails";
import NavBar from "../NavBar";

class AppDetails extends Component {
  render() {
    const appname = this.props.getNameById(this.props.match.params.appid);

    if (appname === undefined) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <NavBar />
        <Container className="mt-5">
          <Table className="mb-4">
            <thead>
              <tr>
                <th>
                  <strong className="text-white">{appname}</strong>
                </th>
                <th className="text-right text-white">
                  In-Game:{" "}
                  <strong className="text-success">
                    <CurrentPlayers appid={this.props.match.params.appid} />
                  </strong>
                </th>
              </tr>
            </thead>
          </Table>

          <TwitchDetails
            appname={appname.replace(/[\u{0080}-\u{FFFF}]/gu, "")}
          />

          <SteamDetails appid={this.props.match.params.appid} />
        </Container>

        <div className="AppDetails">
          <DealDetails appid={this.props.match.params.appid} />
        </div>
      </React.Fragment>
    );
  }
}

export default AppDetails;
