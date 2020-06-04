import React, { Component } from "react";

class IntroTitle extends Component {
    render(){
        return (
        <div 
        className={" d-flex justify-content-center"}
        style={{padding:"3rem", "background-image":"linear-gradient(180deg, rgba(100,100,100,1) 0%, rgba(150,150,150,1) 50%, rgba(170,170,170,0) 100%)"}}>
            <div 
            className={"jumbotron text-center text-white bg-transparent"} 
            style={{width:"75%", "background-image":"linear-gradient(90deg, rgba(23,23,23,0) 0%, rgba(23,23,23,0.7) 15%, rgba(23,23,23,1) 40%, rgba(23,23,23,1) 60%, rgba(23,23,23,0.7) 85%, rgba(23,23,23,0) 100%)"}}>
                <h1 className={"display-1"} >Steam Burst</h1>
                <h3 className={"lead"}>Welcome to Steam Burst, a website dedicated to bringing you all sorts of information about Steam games</h3>
            </div>
        </div>
        )
    }
}

export default IntroTitle;