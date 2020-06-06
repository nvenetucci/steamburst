import React, { Component } from "react";

class PictureSlides extends Component {


    render() {

        return(

            <div id="game_pics" class="carousel slide" data-ride="carousel" >

                <ol class="carousel-indicators">

                {this.props.pics.map((element, index) => {
                        if(element.id === 0){
                            return (

                                <li data-target="#game_pics" data-slide-to={`${element.id}`} class="active"></li>

                            )
                        }
                        return (

                            <li data-target="#game_pics" data-slide-to={`${element.id}`}></li>

                        )
                    })}

                </ol>

                <div class="carousel-inner">

                        
                    {this.props.pics.map((element, index) => {
                        if(element.id === 0){
                            return (

                                <div class="carousel-item active">

                                    <img class="d-block w-100" src={`${element.path_full}`} alt="First slide" />

                                </div>

                            )
                        }
                        return (

                            <div class="carousel-item">

                                <img class="d-block w-100" src={`${element.path_full}`} alt={`${index} slide`} />

                            </div>

                        )
                    })}


                </div>

                <a class="carousel-control-prev" href="#game_pics" role="button" data-slide="prev">

                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>

                    <span class="sr-only">Previous</span>

                </a>

                <a class="carousel-control-next" href="#game_pics" role="button" data-slide="next">

                    <span class="carousel-control-next-icon" aria-hidden="true"></span>

                    <span class="sr-only">Next</span>

                </a>

            </div>

        )


    }

}



export default PictureSlides;