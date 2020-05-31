import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProvided: false,
      term: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.prevTerm && this.state.term !== "") {
      if (this.props.prevTerm === this.state.term) {
        this.setState({ term: "" });
      } else {
        this.setState({ isProvided: true });
      }
    } else if (this.state.term !== "") {
      this.setState({ isProvided: true });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.isProvided) {
      return <Redirect push to={`/search/${this.state.term}`} />;
    }
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            className="SearchInput"
            placeholder="search..."
            name="term"
            value={this.state.term}
            onChange={this.handleChange}
          />
          <button className="btn" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
