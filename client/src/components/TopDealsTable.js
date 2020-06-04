import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SearchResultsData from "./SearchResultsData";

class TopDealsTable extends Component {
  checkIfOnSteam(name, shop_url) {
    var temp;
    temp = this.props.getIdByName(name);
    if(temp === undefined){
        return <a style={{ color: "white" }} href={shop_url}>{name}</a>
    } else {
        return <Link style={{ color: "white" }} to={`/app/${temp}`}>{name}</Link>;
    }
  }

  render() {
    return (
      <Table striped bordered variant="dark">
        <thead>
        </thead>
        <tbody>
          {this.props.apps.map((app, index) => (
            <tr key={this.props.getIdByName(app.title)}>
              <td className={"align-middle"} style={{ width: "2%" }}>{`${this.props.indexOfLastApp + index - 9}.`}</td>
              <td className={"align-middle table-borderless"} style={{ width: "8%" }}><SearchResultsData appid={this.props.getIdByName(app.title)} /></td>
              <td className={"align-middle"} style={{ width: "15%" }}>
                {this.checkIfOnSteam(app.title, app.urls.buy)}
              </td>
              <td className={"align-middle font-weight-bold font-italic"} style={{ width: "10%" }}>
                ${app.price_new}
              </td>
              <td className={"align-middle"} style={{ width: "10%" }}>${app.price_old}</td>
              <td className={"align-middle"} style={{ width: "5%" }}>{app.price_cut}% OFF</td>
              <td className={"align-middle"} style={{ width: "10%" }}><a href={app.urls.buy}>{app.shop.name}</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TopDealsTable;