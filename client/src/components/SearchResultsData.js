import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import unknown from "../assets/unknown.png";

class SearchResultsData extends Component {
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

  handleOnError = (event) => {
    if (event.target.src !== unknown) {
      event.target.src = unknown;
    }
  };

  render() {
    const { isLoaded, details } = this.state;
    const appid = this.props.appid;

    if (!isLoaded) {
      return (
        <React.Fragment>
          <td>
            <Image src={unknown} width="141.35" height="66.05" />
          </td>
          <td className="align-middle">{this.props.name}</td>
          {/* <td>Loading...</td>
          <td className="align-middle">{this.props.name}</td> */}
        </React.Fragment>
      );
    }

    if (details !== null && details[appid].data !== undefined) {
      if (details[appid].data.type === "game") {
        return (
          <React.Fragment>
            <td>
              <Link to={`/app/${appid}`}>
                <Image
                  src={details[appid].data.header_image}
                  width="141.35"
                  height="66.05"
                  onError={this.handleOnError}
                />
              </Link>
            </td>
            <td className="align-middle">
              <Link style={{ color: "white" }} to={`/app/${appid}`}>
                {this.props.name}
                <Badge variant="info" className="ml-2">
                  Info
                </Badge>
              </Link>
            </td>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <td>
            <Image
              src={details[appid].data.header_image}
              width="141.35"
              height="66.05"
              onError={this.handleOnError}
            />
          </td>
          <td className="align-middle">{this.props.name}</td>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <td>
            <Image src={unknown} width="141.35" height="66.05" />
          </td>
          <td className="align-middle">{this.props.name}</td>
        </React.Fragment>
      );
    }
  }
}

export default SearchResultsData;
