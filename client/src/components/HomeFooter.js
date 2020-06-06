import React, { Component } from "react";

import Navbar from "react-bootstrap/Navbar";


class HomeFooter extends Component {

    render(){

        return(

            <footer>

                <Navbar className={'bg-dark'}>

                    <Navbar.Text >
                        
                        <a href={'https://isthereanydeal.com/'} className={'navbar-text text-light'}>IsThereAnyDeal.com</a>
                        
                    </Navbar.Text>

                </Navbar>

            </footer>

        )

    }

}


export default HomeFooter;