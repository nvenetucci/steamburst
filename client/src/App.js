import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Top100Table from "./components/Top100Table";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/item" component={Item} />
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

class Item extends Component {
  render() {
    return (
      <div className="Item">
        <h1>This is the item page</h1>
      </div>
    );
  }
}

export default App;
