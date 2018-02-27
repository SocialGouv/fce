import React from "react";
import "./enterprise.css";
import { Row, Col } from "reactstrap";

class Enterprise extends React.Component {
  render() {
    return (
      <div className="app-enterprise">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Fiche Entreprise</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Enterprise;
