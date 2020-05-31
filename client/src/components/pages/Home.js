import React, { Component } from "react";
import SearchBar from "../SearchBar";
import Top100Table from "../Top100Table";
import TopDeals from "../TopDeals";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <SearchBar />
        <h1>This is the home page</h1>
        <Top100Table />
        <TopDeals getIdByName={this.props.getIdByName} />
      </div>
    );
  }
}

export default Home;
