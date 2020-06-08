import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SearchResultsData from "./SearchResultsData";

class TopDealsTable extends Component {
  checkIfOnSteam(appid, shop_url, to_display) {
    if (appid === undefined) {
      return (
        <a style={{ color: "white" }} href={shop_url}>
          {to_display}
        </a>
      );
    } else {
      return (
        <Link style={{ color: "white" }} to={`/app/${appid}`}>
          {to_display}
        </Link>
      );
    }
  }

  getAppID(name, shop_url){
    const temp = this.props.getIdByName(name);
    if (temp === undefined) {
      if(shop_url.includes("steampowered")){
        const url_list = shop_url.split("/");
        return url_list[url_list.length-2];
      }
      return undefined;
    } else {
      return temp;
    }
  }

  render() {
    return (
      <Table striped bordered variant="dark" responsive>
        <thead></thead>
        <tbody>
          {this.props.apps.map((app, index) => (
            <tr key={this.props.indexOfLastApp + index - 9}>
              <td className={"align-middle"} style={{ width: "2%" }}>{`${
                this.props.indexOfLastApp + index - 9
              }.`}</td>

              <td
                className={"align-middle table-borderless"}
                style={{ width: "8%" }}
              >
                {this.checkIfOnSteam(
                  this.getAppID(app.title,app.urls.buy),
                  app.urls.buy,
                  <SearchResultsData
                    appid={this.getAppID(app.title, app.urls.buy)}
                  />
                )}
              </td>

              <td className={"align-middle"} style={{ width: "15%" }}>
                {this.checkIfOnSteam(this.getAppID(app.title,app.urls.buy), app.urls.buy, app.title)}
              </td>
              <td
                className={"align-middle font-weight-bold font-italic"}
                style={{ width: "10%" }}
              >
                ${app.price_new}
              </td>
              <td className={"align-middle"} style={{ width: "10%" }}>
                ${app.price_old}
              </td>
              <td className={"align-middle"} style={{ width: "5%" }}>
                {app.price_cut}% OFF
              </td>
              <td className={"align-middle"} style={{ width: "10%" }}>
                <a
                  className={"btn btn-success"}
                  style={{ padding: "0.25rem" }}
                  href={app.urls.buy}
                >
                  {app.shop.name}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TopDealsTable;
