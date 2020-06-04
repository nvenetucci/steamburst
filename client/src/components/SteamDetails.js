import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

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

    if (!isLoaded) {
      return (
        <div>
          <ul>
            <li>Loading...</li>
            <li>Loading...</li>
            <li>Loading...</li>
          </ul>
        </div>
      );
    }

    if (details[appid].data == undefined){
      return (
        <div>Could Not Load</div>
      )
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
