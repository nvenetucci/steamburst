import React, { Component } from "react";
import Table from "react-bootstrap/Table";


class SideDetails extends Component {

    readMetaScore(info){
            var score;
            var url;

            try{
                score = info.metacritic.score;
                url = info.metacritic.url;
            } catch(e) {
                score = -1;
                url = "";
            }

            if(score == -1 || score == null || url == ""){
                return (
                    <p>No metacritic score available</p>
                );
            } else {
                return (
                    <a className={"btn btn-info"} style={{
                        "padding-top": "0.5rem",
                        "padding-bottom": "0.5rem",
                        "padding-left": "1rem",
                        "padding-right": "1rem",
                        }} href={url}>
                        <h5>{score}</h5>
                    </a>
                );
            }

        }

    render() {

        

        return (
            <Table borderless >
                <tbody>
                    <tr>

                        <p class='lead text-white  text-center' >{this.props.info.short_description}</p>
                        
                    </tr>
                    <br></br>
                    <tr className='text-center'>

                        <a className='lead text-info text-center' href={`${this.props.info.website}`}> {`${this.props.info.website}`} </a>

                    </tr>
                    <br></br>
                    <tr>

                        
                        <p class='lead text-white  text-center' > Metacritic Score: 

                        <div>
                            {this.readMetaScore(this.props.info)}

                            
                        </div>
                        
                        </p>


                    </tr>
                </tbody>
            </Table>
        )

    }

}

export default SideDetails;