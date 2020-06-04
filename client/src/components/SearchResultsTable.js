import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import CurrentPlayers from "./CurrentPlayers";
import SearchResultsData from "./SearchResultsData";

class SearchResultsTable extends Component {
  render() {
    return (
      <Table striped bordered variant="dark" responsive>
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
              <SearchResultsData appid={app.item.appid} name={app.item.name} />
              <td className="align-middle">
                <CurrentPlayers appid={app.item.appid} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default SearchResultsTable;
