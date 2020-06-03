import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

class TopDealsTable extends Component {
  checkIfOnSteam(name, shop_url) {
    var temp;
    temp = this.props.getIdByName(name);
    if(temp == undefined){
        return <a href={shop_url}>{name}</a>
    } else {
        return <Link to={`/app/${temp}`}>{name}</Link>;
    }
  }

  render() {
    return (
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>img</th>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "25%" }}>Current Price</th>
            <th style={{ width: "20%" }}>Previous Price</th>
            <th style={{ width: "5%" }}>Savings</th>
            <th style={{ width: "10%" }}>Shop</th>
          </tr>
        </thead>
        <tbody>
          {this.props.apps.map((app, index) => (
            <tr key={app.appid}>
              <td>{`${this.props.indexOfLastApp + index - 9}.`}</td>
              <td>
                <Link style={{ color: "white" }} to={`/app/${app.appid}`}>
                  {app.name}
                </Link>
              </td>
              <td>{app.current}</td>
              <td>{app.peak}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default SteamTop100Table;
