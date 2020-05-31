import React, { Component } from "react";
import Top100Table from "../Top100Table";
import TopDeals from "../TopDeals";
import NavBar from "../NavBar";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <NavBar />
        <h1>This is the home page</h1>
        <Top100Table />
        <TopDeals getIdByName={this.props.getIdByName} />
      </div>
    );
  }
}

export default Home;
