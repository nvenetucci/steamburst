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
    fetch(`/steam/app/${this.props.appid}/players`)
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, players: data }));
  }

  render() {
    const { isLoaded, players } = this.state;

    if (!isLoaded) {
      return <span>Loading...</span>;
    }

    if (players.response.player_count !== undefined) {
      return (
        <span>
          {players.response.player_count
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      );
    } else {
      return <span>---</span>;
    }
  }
}

export default CurrentPlayers;
