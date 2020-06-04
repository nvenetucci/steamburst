import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class DealDetailsTable extends Component {

    render() {

        return (
        <Table striped bordered variant="dark">
            <thead>
                <tr>
                    <th>Store</th>
                    <th>Current Price</th>
                    <th>Previous Price</th>
                    <th>Savings</th>
                </tr>
            </thead>
            <tbody>
                {this.props.stores.map((app, index) => (
                    <tr key={index}>
                        <td>
                            <a className={"btn btn-success"} style={{padding: "0.25rem"}} href={app.url}>{app.shop.name}</a>
                        </td>
                        <td className={"font-weight-bold font-italic"} >${app.price_new}</td>
                        <td>${app.price_old}</td>
                        <td>{app.price_cut}% OFF</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        );

    }
}

export default DealDetailsTable;