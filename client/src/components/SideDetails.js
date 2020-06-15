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

            if(score === -1 || score == null || url === ""){
                return (
                    <p>No Metacritic Score Available</p>
                );
            } else {
                return (
                    <a className={"btn btn-info"} style={{
                        "paddingTop": "0.5rem",
                        "paddingBottom": "0.5rem",
                        "paddingLeft": "1rem",
                        "paddingRight": "1rem",
                        "borderRadius": "30%",
                        }} href={url}>
                        <h3>{score}</h3>
                    </a>
                );
            }

        }

    render() {

        

        return (
            <Table borderless className="mb-0">
                <tbody>
                    <tr>
                        <p className='lead text-white  text-left' >{this.props.info.short_description}</p>
                    </tr>

                    <br></br>

                    {this.props.info.website &&
                        <React.Fragment>

                            <tr className='text-left'>

                                <a className='lead text-info text-center' href={`${this.props.info.website}`}> {`${this.props.info.website}`} </a>

                            </tr>
                    
                            <br></br>
                        </React.Fragment>
                    }  

                    <tr>

                        <p className='lead text-white  text-left' > Metacritic Score: 

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