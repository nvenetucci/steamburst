import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import unknown from "../assets/unknown.png";

class SearchResultsImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      details: {},
    };
  }

  componentDidMount() {
    fetch(`/steam/app/${this.props.appid}`)
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, details: data }))
      .catch((err) => console.log("Request failed", err));
  }

  render() {
    const { isLoaded, details } = this.state;
    const appid = this.props.appid;

    if (!isLoaded) {
      return <p>Loading...</p>;
    }

    if (details !== null && details[appid].data !== undefined) {
      return <Image src={details[appid].data.header_image} fluid />;
    } else {
      return <Image src={unknown} width="141.35" height="66.05" />;
    }
  }
}

export default SearchResultsImage;
