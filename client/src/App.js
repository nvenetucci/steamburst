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
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          isLoaded: true,
          countries: data,
        });
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
            {countries.map((country) => (
              <li key={country.name}>{country.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
