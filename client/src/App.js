import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      top100: [],
    };
  }

  componentDidMount() {
    fetch("/top100")
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, top100: json }));
  }

  render() {
    var { isLoaded, top100 } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h2>{top100.shift().updated}</h2>
          <ul>
            {top100.map((stat, index) => (
              <li key={index}>{stat.game}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
