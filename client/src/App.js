import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Fuse from "fuse.js";
import "./App.css";
import Top100Table from "./components/Top100Table";
import TopDeals from "./components/TopDeals";
import CurrentPlayers from "./components/CurrentPlayers";
import SteamDetails from "./components/SteamDetails";
import TwitchDetails from "./components/TwitchDetails";
import DealDetails from "./components/DealDetails";
import SearchBar from "./components/SearchBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      apps: [],
    };
  }

  componentDidMount() {
    fetch("/steam/applist")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ isLoaded: true, apps: data.applist.apps })
      )
      .catch((err) => console.log("Request failed", err));
  }

  getNameById = (appid) => {
    const obj = this.state.apps.find((app) => `${app.appid}` === appid);

    return obj.name;
  };

  getIdByName = (appname) => {
    const obj = this.state.apps.find((app) => `${app.name}` === appname);

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
                <SearchResults
                  {...props}
                  key={props.match.params.term}
                  apps={this.state.apps}
                />
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
        <TopDeals getIdByName={this.props.getIdByName} />
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
        <DealDetails appid={this.props.match.params.appid} />
      </div>
    );
  }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      results: [],
    };
  }

  async componentDidMount() {
    // this.search(this.props.match.params.term).then((data) => {
    //   console.log(data);
    //   this.setState({ isLoaded: true, results: data });
    // });
    const data = await this.search(this.props.match.params.term);

    this.setState({ isLoaded: true, results: data });
  }

  search = async (term) => {
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      threshold: 0.167,
      // distance: 100,
      // useExtendedSearch: false,
      keys: ["name"],
    };

    const fuse = new Fuse(this.props.apps, options);

    const pattern = term;

    return fuse.search(pattern);
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="SearchResults">
          <SearchBar prevTerm={this.props.match.params.term} />
          <h1>This is the search results page</h1>
          <p>Showing results for "{this.props.match.params.term}"</p>
          <ul>
            {this.state.results.map((app, index) => (
              <li key={index}>{app.item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
