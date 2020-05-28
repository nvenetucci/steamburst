import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Top100Table from "./components/Top100Table";
import CurrentPlayers from "./components/CurrentPlayers";
import SteamDetails from "./components/SteamDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      apps: {},
    };
  }

  componentDidMount() {
    fetch("/steam/applist")
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, apps: data }));
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app/:appid" exact component={AppInfo} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      );
    }
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
  render() {
    return (
      <div className="AppInfo">
        <SteamDetails appid={this.props.match.params.appid} />
        <CurrentPlayers appid={this.props.match.params.appid} />
      </div>
    );
  }
}

export default App;
