import React, { Component } from "react";

class TwitchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      streams: [],
    };
  }

  componentDidMount() {
    fetch(`/twitch/${this.props.appname}`)
      .then((res) => res.json())
      .then((json) => fetch(`/twitch/${json.data[0].id}/streams`))
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, streams: json }))
      .catch((err) => console.log("Request failed", err));
  }

  render() {
    const { isLoaded, streams } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <p>Loading...</p>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="TwitchCount">
          <p>Streaming Now: {streams.length}</p>
          <p>Viewers: {streams.reduce((a, b) => a + b.viewer_count, 0)}</p>
        </div>
      );
    }
  }
}

export default TwitchDetails;
