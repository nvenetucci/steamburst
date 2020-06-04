import React, { Component } from "react";
import DealDetailsTable from "./DealDetailsTable";

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
        } 

        const currentStores = deal_data.data[game_name].list

        return (
            <div className={"container mt-5"}>
                <DealDetailsTable stores={currentStores} />
            </div>
        );

    }
}

export default DealDetails;