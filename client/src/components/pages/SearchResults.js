import React, { Component } from "react";
import SearchBar from "../SearchBar";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      results: [],
    };
  }

  componentDidMount() {
    fetch(`/steam/search/${this.props.match.params.term}`)
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, results: data }))
      .catch((err) => console.log("Request failed", err));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="SearchResults">
          <SearchBar prevTerm={this.props.match.params.term} />
          <h1>This is the search results page</h1>
          <p>Showing results for "{this.props.match.params.term}"</p>
          <ul>
            {this.state.results.map((app, index) => (
              <li key={index}>{app.item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default SearchResults;
