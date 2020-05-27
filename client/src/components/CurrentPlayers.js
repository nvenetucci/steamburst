import React, { Component } from "react";

class CurrentPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      players: {},
    };
  }

  componentDidMount() {
    fetch(`/app/${this.props.appid}/players`)
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, players: json }));
  }

  render() {
    const { isLoaded, players } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="CurrentPlayers">
          <p>Current Players: {players.response.player_count}</p>
        </div>
      );
    }
  }
}

export default CurrentPlayers;
