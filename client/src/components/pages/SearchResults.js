import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import NavBar from "../NavBar";
import SearchResultsTable from "../SearchResultsTable";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      results: [],
      currentPage: 1,
      appsPerPage: 15,
    };
  }

  componentDidMount() {
    fetch(`/steam/search/${this.props.match.params.term}`)
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, results: data }))
      .catch((err) => console.log("Request failed", err));
  }

  paginate = (event) => {
    event.preventDefault();

    if (this.currentPage !== event.target.text) {
      this.setState({ currentPage: event.target.text });
    }
  };

  // render() {
  //     return (
  //       <div className="SearchResults">
  //         <p>Showing results for "{this.props.match.params.term}"</p>
  //         <ul>
  //           {this.state.results.map((app, index) => (
  //             <li key={index}>{app.item.name}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  // }
  render() {
    const { isLoaded, results, currentPage, appsPerPage } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <NavBar prevTerm={this.props.match.params.term} />
          <p>Loading...</p>
        </div>
      );
    }

    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;
    const currentApps = results.slice(indexOfFirstApp, indexOfLastApp);

    const pageNumbers = [];

    for (
      let number = 1;
      number <= Math.ceil(results.length / appsPerPage);
      number++
    ) {
      pageNumbers.push(
        <Pagination.Item key={number} active={number === parseInt(currentPage)}>
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div className="SearchResults">
        <NavBar prevTerm={this.props.match.params.term} />
        <div className="container mt-5">
          <SearchResultsTable apps={currentApps} />
          <Pagination onClick={this.paginate}>{pageNumbers}</Pagination>
        </div>
      </div>
    );
  }
}

export default SearchResults;
