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
      .then((data) => this.setState({ isLoaded: true, players: data }))
      .catch((err) => console.log("Request failed", err));
  }

  render() {
    const { isLoaded, players } = this.state;

    if (!isLoaded) {
      return <span className="text-white">Loading...</span>;
    }

    if (players.response.player_count !== undefined) {
      return (
        <React.Fragment>
          {players.response.player_count
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>0</React.Fragment>;
    }
  }
}

export default CurrentPlayers;
