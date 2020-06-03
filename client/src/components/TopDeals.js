import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import TopDealsTable from "./TopDealsTable";

class TopDeals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            deal_data: [],
            currentPage: 1,
            appsPerPage: 10,
        };
    }

    componentDidMount() {
        fetch("/deals")
        .then((res) => res.json())
        .then((data) => this.setState({isLoaded: true, deal_data: data}));
    }

    paginate = (event) => {
        event.preventDefault();
    
        if (this.currentPage !== event.target.text) {
          this.setState({ currentPage: event.target.text });
        }
      };

    checkIfOnSteam(name, shop_url) {
        var temp;
        temp = this.props.getIdByName(name);
        if(temp === undefined){
            return <a href={shop_url}>{name}</a>
        } else {
            return <Link to={`/app/${temp}`}>{name}</Link>;
        }
    }

    render() {
        
        const { isLoaded, deal_data, currentPage, appsPerPage } = this.state;

        if (!isLoaded) {
            return (
            <div class="text-center">
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            )
        }

        const indexOfLastApp = currentPage * appsPerPage;
        const indexOfFirstApp = indexOfLastApp - appsPerPage;
        const currentApps = deal_data.slice(indexOfFirstApp, indexOfLastApp);
        const pageNumbers = [];

        for (
            let number = 1;
            number <= Math.ceil(deal_data.length / appsPerPage);
            number++
          ) {
            pageNumbers.push(
              <Pagination.Item key={number} active={number === parseInt(currentPage)}>
                {number}
              </Pagination.Item>
            );
          }

        return (
        <div className="TopDeals container mt-5">
            <h1 className={"display-1 text-center text-white"} >Top Deals</h1>
            <TopDealsTable apps={currentApps} indexOfLastApp={indexOfLastApp} getIdByName={this.props.getIdByName} />
            <Pagination onClick={this.paginate}>{pageNumbers}</Pagination>
        </div>
        );
    }
}

export default TopDeals;