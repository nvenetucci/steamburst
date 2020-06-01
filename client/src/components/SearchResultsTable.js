import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SearchResultsImage from "./SearchResultsImage";

class SearchResultsTable extends Component {
  render() {
    return (
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th style={{ width: "15%" }}></th>
            <th style={{ width: "45%" }}>Name</th>
            <th style={{ width: "40%" }}>Current Players</th>
          </tr>
        </thead>
        <tbody>
          {this.props.apps.map((app) => (
            <tr key={app.item.appid}>
              <td>
                <SearchResultsImage appid={app.item.appid} />
                {/* {app.item.appid} */}
              </td>
              <td className="align-middle">{app.item.name}</td>
              <td className="align-middle">Placeholder</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default SearchResultsTable;
