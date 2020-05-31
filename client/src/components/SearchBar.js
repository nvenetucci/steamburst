import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

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
      <Form inline onSubmit={this.handleSubmit} className="ml-auto">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-sm-2"
          name="term"
          value={this.state.term}
          onChange={this.handleChange}
        />
        <Button variant="outline-info" type="submit">
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchBar;
