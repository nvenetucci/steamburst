import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Top100Table from "./components/Top100Table";
import TopDeals from "./components/TopDeals";
import CurrentPlayers from "./components/CurrentPlayers";
import SteamDetails from "./components/SteamDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app" exact render={() => <Redirect to="/" />} />
          <Route path="/app/:appid" component={AppInfo} />
          <Route path="/deals" component={TopDeals} />
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
