import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import NavBar from "../NavBar";
import SearchResultsTable from "../SearchResultsTable";
import Spinner from "react-bootstrap/Spinner";

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

  render() {
    const { isLoaded, results, currentPage, appsPerPage } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <NavBar prevTerm={this.props.match.params.term} />
          <div className="container mt-5 text-white">
            {"Found "}
            <Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
            {` result(s) for ${this.props.match.params.term}`}
          </div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <React.Fragment>
          <NavBar prevTerm={this.props.match.params.term} />
          <div className="container mt-5">
            <p className="text-white">
              Found <strong>{results.length}</strong> result(s) for "
              {this.props.match.params.term}"
            </p>
          </div>
        </React.Fragment>
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
          <p className="text-white">
            Found <strong>{results.length}</strong> result(s) for "
            {this.props.match.params.term}"
          </p>
          <SearchResultsTable apps={currentApps} />
          <Pagination onClick={this.paginate}>{pageNumbers}</Pagination>
        </div>
      </div>
    );
  }
}

export default SearchResults;
