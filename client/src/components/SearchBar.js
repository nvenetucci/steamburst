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
        <div class="input-group">
          <FormControl
            type="search"
            placeholder="Search"
            name="term"
            value={this.state.term}
            onChange={this.handleChange}
          />
          <div class="input-group-append">
            <Button variant="outline-info" type="submit">
              Search
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

export default SearchBar;
