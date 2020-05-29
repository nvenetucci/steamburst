import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      appid: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const appid = this.props.getIdByName(this.state.title);

    this.setState({ appid: appid });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.appid !== "") {
      return <Redirect push to={`/app/${this.state.appid}`} />;
    }
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            className="SearchInput"
            placeholder="search..."
            name="title"
            value={this.state.title}
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
