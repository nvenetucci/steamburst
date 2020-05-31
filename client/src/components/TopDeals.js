import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopDeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            deal_data: [],
        };
    }

    componentDidMount() {
        fetch("/deals")
        .then((res) => res.json())
        .then((data) => this.setState({isLoaded: true, deal_data: data}));
    }

    checkIfOnSteam(name, shop_url) {
        var temp;
        try{
            temp = this.props.getIdByName(name);
        } catch (e) {
            return <a href={shop_url}>{name}</a>
        }
        return <Link to={`/app/${temp}`}>{name}</Link>;
    }

    render() {
        var { isLoaded, deal_data } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
            <div className="TopDeals">
                <h1>Top Deals</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Current Price</th>
                            <th>Previous Price</th>
                            <th>Savings</th>
                            <th>Shop</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* {deal_data.data.list.map((app, index) => ( */}
                        {deal_data.map((app, index) => (

                            <tr key={index}>
                                <td>
                                    {this.checkIfOnSteam(app.title, app.urls.buy)}
                                </td>
                                <td>{app.price_new}</td>
                                <td>{app.price_old}</td>
                                <td>{app.price_cut}% OFF</td>
                                <td>
                                    <a href={app.urls.buy}>{app.shop.name}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            );
        }
    }
}

export default TopDeals;