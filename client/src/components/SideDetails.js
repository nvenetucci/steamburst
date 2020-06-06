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
                    <p></p>
                );
            } else {
                return (
                    <p class='lead text-white  text-left' > Metacritic Score: 
                    <br>
                    </br>
                        <a className={"btn btn-info"} style={{
                            "padding-top": "0.5rem",
                            "padding-bottom": "0.5rem",
                            "padding-left": "1rem",
                            "padding-right": "1rem",
                            "border-radius": "30%",
                            }} href={url}>
                            <h3>{score}</h3>
                        </a>
                    </p>
                );
            }

        }


    readWebsite(info){
        
        var website = "";

        if(info.website == null){

            return website;

        }
        else {

            return (
                <a 

                    className='lead text-info text-center' 

                    href={`${info.website}`}> 

                    {`${info.website}`} 

                </a>

            )
        }
    }

    render() {

        

        return (
            <Table borderless className="mb-0">
                <tbody>
                    <tr>
                        <p class='lead text-white  text-left' >{this.props.info.short_description}</p>
                    </tr>

                    <br></br>

                    <tr className='text-left'>

                        {this.readWebsite(this.props.info)}

                    </tr>

                    <br></br>

                    <tr>


                        <div>

                            {this.readMetaScore(this.props.info)}

                        </div>


                    </tr>

                    <br></br>

                    <tr>

                        <Button variant="secondary" href={`https://store.steampowered.com/app/${this.props.info.steam_appid}/`} >

                            Steam Page

                        </Button>

                    </tr>

                </tbody>

            </Table>

        )

    }

}

export default SideDetails;