import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      countries: [],
    };
  }

  componentDidMount() {
    fetch("/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ isLoaded: true, countries: data });
      });
  }

  render() {
    var { isLoaded, countries } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <ul>
            {countries.map((country, index) => (
              <li key={index}>{country.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
