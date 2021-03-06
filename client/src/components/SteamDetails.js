import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import DealDetails from "./DealDetails";
import PictureSlides from "./PictureSlides";
import SideDetails from "./SideDetails";

class SteamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      details: {},
    };
  }

  componentDidMount() {
    fetch(`/steam/app/${this.props.appid}`)
      .then((res) => res.json())
      .then((json) => this.setState({ isLoaded: true, details: json }));
  }

  render() {
    const { isLoaded, details } = this.state;
    const appid = this.props.appid;

    const steamStyle = {
      border: "solid",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "DimGray",
      color: "white",
    };

    if (!isLoaded) {
      return (
        <React.Fragment>
          <Row className="justify-content-between">
            <Col sm={2}></Col>
            <Col sm={5} className="text-center mb-4">
              <br />
              <br />
              <br />
              <Spinner animation="border" role="status" variant="light">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <br />
            </Col>
            <Col sm={2}></Col>
          </Row>
        </React.Fragment>
      );
    }

    if (details === null || details[appid].data === undefined) {
      return (
        <React.Fragment>
          <Row className="justify-content-between">
            <Col sm={2}></Col>
            <Col sm={6} style={steamStyle} className="text-center mb-4 bg-dark">
              <br />
              <h5 className="text-white">
                Oops, we couldn't retrieve Steam data about this application.
                Sorry!
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
        <Row className="justify-content-center">
          <Col sm={5} className="text-center mb-2">
            <Image
              src={details[appid].data.header_image}
              width="460"
              height="215"
              fluid
            />
            <Table striped bordered variant="dark" responsive>
              <tbody className="text-left">
                {details[appid].data.name && (
                  <tr>
                    <td style={{ width: "30%" }}>Name</td>
                    <td>{details[appid].data.name}</td>
                  </tr>
                )}
                {details[appid].data.developers && (
                  <tr>
                    <td>Developer</td>
                    <td>{details[appid].data.developers[0]}</td>
                  </tr>
                )}
                {details[appid].data.publishers && (
                  <tr>
                    <td>Publisher</td>
                    <td>{details[appid].data.publishers[0]}</td>
                  </tr>
                )}
                {details[appid].data.release_date && (
                  <tr>
                    <td>Release Date</td>
                    <td>{details[appid].data.release_date.date}</td>
                  </tr>
                )}
                {details[appid].data.genres && (
                  <tr>
                    <td colSpan="2">
                      {details[appid].data.genres.map((genre, index) => (
                        <Badge key={index} variant="secondary" className="mr-1">
                          {genre.description}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan="2">
                    <Button
                      variant="secondary"
                      href={`https://store.steampowered.com/app/${appid}/`}
                    >
                      Steam Store
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {details[appid].data.screenshots && (
          <PictureSlides pics={details[appid].data.screenshots} />
        )}
        <br></br>
        <SideDetails info={details[appid].data} />
        <br></br>
        <DealDetails appid={appid} />
      </React.Fragment>
    );
  }
}

export default SteamDetails;
