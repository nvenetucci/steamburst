import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

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
      return (
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
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
