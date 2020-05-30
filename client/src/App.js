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
import TwitchDetails from "./components/TwitchDetails";
import SearchBar from "./components/SearchBar";

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
      .then((data) => this.setState({ isLoaded: true, apps: data }))
      .catch((err) => console.log("Request failed", err));
  }

  getNameById = (appid) => {
    const obj = this.state.apps.applist.apps.find(
      (app) => `${app.appid}` === appid
    );

    return obj.name;
  };

  getIdByName = (appname) => {
    const obj = this.state.apps.applist.apps.find(
      (app) => `${app.name}` === appname
    );

    return obj.appid;
  };

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Router>
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route
              path="/"
              exact
              render={(props) => (
                <Home {...props} getIdByName={this.getIdByName} />
              )}
            />
            <Route
              path="/app/:appid"
              exact
              render={(props) => (
                <AppInfo {...props} getNameById={this.getNameById} />
              )}
            />
            <Route
              path="/search/:term"
              exact
              render={(props) => (
                <SearchResults key={props.match.params.term} {...props} />
              )}
            />
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
        <SearchBar getIdByName={this.props.getIdByName} />
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
        <TwitchDetails
          appname={this.props.getNameById(this.props.match.params.appid)}
        />
      </div>
    );
  }
}

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <SearchBar />
        <h1>This is the Search Results page</h1>
        <p>Showing results for "{this.props.match.params.term}"</p>
      </div>
    );
  }
}

export default App;
