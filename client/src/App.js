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
          <p>{top100.shift().updated}</p>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Current Players</th>
                <th>Peak Today</th>
              </tr>
            </thead>
            <tbody>
              {top100.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.game}</td>
                  <td>{stat.current}</td>
                  <td>{stat.peak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
