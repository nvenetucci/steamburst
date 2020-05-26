import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Top100Table from "./components/Top100Table";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app" exact render={() => <Redirect to="/" />} />
          <Route path="/app/:appid" component={AppInfo} />
        </Switch>
      </Router>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>This is the home page</h1>
        <Top100Table />
      </div>
    );
  }
}

class AppInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appid: "",
      infoIsLoaded: false,
      info: {},
      playersIsLoaded: false,
      players: {},
    };
  }

  componentDidMount() {
    const appid = this.props.match.params.appid;
    this.setState({ appid });

    fetch(`/app/${appid}`)
      .then((res) => res.json())
      .then((data) => this.setState({ infoIsLoaded: true, info: data }));

    fetch(`/app/${appid}/players`)
      .then((res) => res.json())
      .then((data) => this.setState({ playersIsLoaded: true, players: data }));
  }

  render() {
    let { appid, infoIsLoaded, info, playersIsLoaded, players } = this.state;

    if (!infoIsLoaded || !playersIsLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="AppInfo">
          <ul>
            <li>{`App ID: ${appid}`}</li>
            <li>{`Name: ${info[appid].data.name}`}</li>
            <li>{`Description: ${info[appid].data.short_description}`}</li>
            <li>{`Current Players: ${players.response.player_count}`}</li>
          </ul>
          <h1></h1>
        </div>
      );
    }
  }
}

export default App;
