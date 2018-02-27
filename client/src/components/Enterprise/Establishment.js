import React from "react";
import "./enterprise.css";
import { Row, Col } from "reactstrap";

class Establishment extends React.Component {
  render() {
    return (
      <div className="app-enterprise">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Fiche Établissement</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Establishment;
