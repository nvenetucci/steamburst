import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

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
                Sorry! We couldn't retrieve Steam data about this application.
                It must not be available on the Steam store.
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
          <Col sm={5} className="text-center">
            <Image
              src={details[appid].data.header_image}
              width="460"
              height="215"
              fluid
            />
            <Table striped bordered variant="dark" size="md">
              <tbody className="text-left">
                <tr>
                  <td style={{ width: "30%" }}>Name</td>
                  <td>{details[appid].data.name}</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>{details[appid].data.developers[0]}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>{details[appid].data.publishers[0]}</td>
                </tr>
                <tr>
                  <td>Release Date</td>
                  <td>{details[appid].data.release_date.date}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {details[appid].data.genres.map((genre, index) => (
                      <Badge key={index} variant="secondary" className="mr-1">
                        {genre.description}
                      </Badge>
                    ))}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default SteamDetails;
