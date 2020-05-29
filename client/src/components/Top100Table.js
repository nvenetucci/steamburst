import React, { Component } from "react";
import { Link } from "react-router-dom";

class Top100Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      top100: [],
    };
  }

  componentDidMount() {
    fetch("/steam/top100")
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, top100: json }));
  }

  render() {
    var { isLoaded, top100 } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Top100Table">
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
              {top100.map((app, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/app/${app.appid}`}>{app.name}</Link>
                  </td>
                  <td>{app.current}</td>
                  <td>{app.peak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Top100Table;
