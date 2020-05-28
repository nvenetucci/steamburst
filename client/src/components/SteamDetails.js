import React, { Component } from "react";

class SteamDetails extends Component {
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
      .then((json) => this.setState({ isLoaded: true, details: json }));
  }

  render() {
    const { isLoaded, details } = this.state;
    const appid = this.props.appid;

    if (!isLoaded) {
      return (
        <div>
          <ul>
            <li>Loading...</li>
            <li>Loading...</li>
            <li>Loading...</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="SteamDetails">
          <ul>
            <li>{`App ID: ${appid}`}</li>
            <li>{`Name: ${details[appid].data.name}`}</li>
            <li>{`Description: ${details[appid].data.short_description}`}</li>
          </ul>
        </div>
      );
    }
  }
}

export default SteamDetails;
