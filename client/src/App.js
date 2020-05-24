import React, { Component } from "react";
import "./App.css";
import Top100Table from "./components/Top100Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Top100Table />
      </div>
    );
  }
}

export default App;
