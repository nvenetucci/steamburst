import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import twitch_logo from "../assets/twitch_logo.png";

class TwitchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      streams: [],
      noData: false,
    };
  }

  componentDidMount() {
    fetch(`/twitch/${this.props.appname}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data.length === 0) {
          this.setState({ isLoaded: true, noData: true });
        } else {
          fetch(`/twitch/${json.data[0].id}/streams`)
            .then((res) => res.json())
            .then((json) => this.setState({ isLoaded: true, streams: json }))
            .catch((err) => console.log("Request failed", err));
        }
      })
      .catch((err) => console.log("Request failed", err));
  }

  render() {
    const { isLoaded, streams, noData } = this.state;

    const twitchStyle = {
      backgroundColor: "#6441a5",
      border: "solid",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#9146ff",
      color: "white",
    };

    if (!isLoaded) {
      return (
        <React.Fragment>
          <Row className="justify-content-between">
            <Col sm={1}></Col>
            <Col sm={1} className="text-center mb-4 px-0 mr-3"></Col>
            <Col sm={3} style={twitchStyle} className="text-center mb-4">
              <br />
              <p></p>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <br />
              <br />
              <p></p>
            </Col>
            <Col sm={3} style={twitchStyle} className="text-center mb-4">
              <br />
              <p></p>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <br />
              <br />
              <p></p>
            </Col>

            <Col sm={2}></Col>
          </Row>
        </React.Fragment>
      );
    }

    if (noData) {
      return (
        <React.Fragment>
          <Row className="justify-content-between">
            <Col sm={2}></Col>
            <Col sm={6} style={twitchStyle} className="text-center mb-4">
              <br />
              <h5>
                Whoops, we were unable to retrieve Twitch stats regarding this
                application. Sorry!{" "}
              </h5>
              <br />
            </Col>
            <Col sm={2}></Col>
          </Row>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Row className="justify-content-between">
          <Col sm={1}></Col>
          <Col sm={1} className="text-center mb-4 px-0 mr-3">
            <a
              href={`https://www.twitch.tv/directory/game/${this.props.appname}`}
            >
              <Image
                src={twitch_logo}
                style={{ ...twitchStyle, width: "4rem" }}
              />
            </a>
          </Col>

          <Col sm={3} style={twitchStyle} className="text-center mb-4">
            <br />
            <h5>Streaming</h5>
            <h4>
              {streams.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h4>
            <br />
          </Col>
          <Col sm={3} style={twitchStyle} className="text-center mb-4">
            <br />
            <h5>Viewers</h5>
            <h4>
              {streams
                .reduce((a, b) => a + b.viewer_count, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h4>
            <br />
          </Col>
          <Col sm={2}></Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm={10} style={twitchStyle} className="text-center mb-4">
            <ResponsiveEmbed aspectRatio="16by9">
              <iframe
                title="TwitchEmbedded"
                src={`https://player.twitch.tv/?channel=${streams[0].user_name}&parent=streamernews.example.com&muted=true&autoplay=false`}
                height="720"
                width="1280"
                frameBorder="0"
                scrolling="no"
                allowFullScreen={true}
              ></iframe>
            </ResponsiveEmbed>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default TwitchDetails;
