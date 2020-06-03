import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import SteamTop100Table from "./SteamTop100Table";

class SteamTop100 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      top100: {},
      currentPage: 1,
      appsPerPage: 10,
    };
  }

  componentDidMount() {
    fetch("/steam/top100")
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, top100: data }))
      .catch((err) => console.log("Request failed", err));
  }

  paginate = (event) => {
    event.preventDefault();

    if (this.currentPage !== event.target.text) {
      this.setState({ currentPage: event.target.text });
    }
  };

  render() {
    const { isLoaded, top100, currentPage, appsPerPage } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;
    const currentApps = top100.apps.slice(indexOfFirstApp, indexOfLastApp);

    const pageNumbers = [];

    for (
      let number = 1;
      number <= Math.ceil(top100.apps.length / appsPerPage);
      number++
    ) {
      pageNumbers.push(
        <Pagination.Item key={number} active={number === parseInt(currentPage)}>
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div className="container mt-5">
        <span className="float-right mb-1 text-white">{top100.updated}</span>
        <SteamTop100Table apps={currentApps} indexOfLastApp={indexOfLastApp} />
        <Pagination onClick={this.paginate}>{pageNumbers}</Pagination>
      </div>
    );
  }
}

export default SteamTop100;
