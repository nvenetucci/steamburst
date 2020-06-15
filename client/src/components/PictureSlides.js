import React, { Component } from "react";

class PictureSlides extends Component {


    render() {

        return(

            <div id="game_pics" className="carousel slide" data-ride="carousel" >

                <ol className="carousel-indicators">

                {this.props.pics.map((element, index) => {
                        if(element.id === 0){
                            return (

                                <li data-target="#game_pics" data-slide-to={`${element.id}`} className="active"></li>

                            )
                        }
                        return (

                            <li data-target="#game_pics" data-slide-to={`${element.id}`}></li>

                        )
                    })}

                </ol>

                <div className="carousel-inner">

                        
                    {this.props.pics.map((element, index) => {
                        if(element.id === 0){
                            return (

                                <div className="carousel-item active">

                                    <img className="d-block w-100" src={`${element.path_full}`} alt="First slide" />

                                </div>

                            )
                        }
                        return (

                            <div className="carousel-item">

                                <img className="d-block w-100" src={`${element.path_full}`} alt={`${index} slide`} />

                            </div>

                        )
                    })}


                </div>

                <a className="carousel-control-prev" href="#game_pics" role="button" data-slide="prev">

                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>

                    <span className="sr-only">Previous</span>

                </a>

                <a className="carousel-control-next" href="#game_pics" role="button" data-slide="next">

                    <span className="carousel-control-next-icon" aria-hidden="true"></span>

                    <span className="sr-only">Next</span>

                </a>

            </div>

        )


    }

}



export default PictureSlides;