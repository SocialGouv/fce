import React from "react";
import "./errors.scss";
import { Container, Row, Col } from "reactstrap";

class Error404 extends React.Component {
  render() {
    return (
      <Container className="app-error">
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1 className="title">Page introuvable</h1>

            <p className="description">
              La page que vous avez demandée est introuvable
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Error404;
