import React from "react";
import "./errors.css";
import { Container, Row, Col } from "reactstrap";

class Error403 extends React.Component {
  render() {
    return (
      <Container className="app-error">
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1 className="title">Accès refusé</h1>

            <p className="description">
              Vous n'avez pas les autorisations nécessaire pour accéder à cette
              page
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Error403;
