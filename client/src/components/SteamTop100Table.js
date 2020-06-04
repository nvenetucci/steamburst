import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

class SteamTop100Table extends Component {
  render() {
    return (
      <Table striped bordered variant="dark" className={"table-responsive-sm"}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "55%" }}>Name</th>
            <th style={{ width: "20%" }}>Current Players</th>
            <th style={{ width: "20%" }}>Peak Today</th>
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
