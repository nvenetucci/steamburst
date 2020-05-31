import React, { Component } from "react";

class DealDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            deal_data: {},
            game_name: "",
        };
    }

    componentDidMount() {

        fetch(`/deals/${this.props.appid}`)
          .then((res) => res.json())
          .then((data) => this.setState({ 
              isLoaded: true, 
              deal_data: data, 
              game_name: Object.keys(data.data)[0]
            }));
    }

    render() {
        var {isLoaded, deal_data, game_name} = this.state
        
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
            <div className="DealDetails">
                <table>
                    <thead>
                        <tr>
                            <th>Store</th>
                            <th>Current Price</th>
                            <th>Previous Price</th>
                            <th>Savings</th>

                        </tr>
                    </thead>
                    <tbody>
                        {deal_data.data[game_name].list.map((app, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={app.url}>{app.shop.name}</a>
                                </td>
                                <td>{app.price_new}</td>
                                <td>{app.price_old}</td>
                                <td>{app.price_cut}% OFF</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            );
        }
    }
}

export default DealDetails;