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
      isLoaded: false,
      appid: "",
      info: {},
    };
  }

  componentDidMount() {
    const appid = this.props.match.params.appid;

    fetch(`/app/${appid}`)
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, appid, info: json }));
  }

  render() {
    let { isLoaded, appid, info } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="AppInfo">
          <ul>
            <li>{appid}</li>
            <li>{info[appid].data.name}</li>
            <li>{info[appid].data.short_description}</li>
          </ul>
          <h1></h1>
        </div>
      );
    }
  }
}

export default App;
