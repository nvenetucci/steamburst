import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Spinner from "react-bootstrap/Spinner";
import Home from "./components/pages/Home";
import AppDetails from "./components/pages/AppDetails";
import SearchResults from "./components/pages/SearchResults";

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

    if (obj === undefined) {
      return undefined;
    } else {
      return obj.name;
    }
  };

  getIdByName = (appname) => {
    const obj = this.state.apps.find((app) => `${app.name}` === appname);

    if (obj === undefined) {
      return undefined;
    } else {
      return obj.appid;
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <Spinner
          animation="border"
          role="status"
          variant="light"
          className="ml-3 mt-3"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <Router>
          <Switch>
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
                <AppDetails {...props} getNameById={this.getNameById} />
              )}
            />
            <Route
              path="/search/:term"
              exact
              render={(props) => (
                <SearchResults {...props} key={props.match.params.term} />
              )}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
