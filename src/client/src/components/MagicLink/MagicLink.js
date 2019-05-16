import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import "./magicLink.scss";
import { Container, Row, Col, Alert } from "reactstrap";
import { Link } from "react-router-dom";

class MagicLink extends React.Component {
  render() {
    return (
      <Container className="app-magicLink">
        <Row className="justify-content-md-center">
          <Col className="magicLink-container" xl="6" md="6">
            {this.props.hasError && (
              <div>
                <Alert color="danger">{this.props.errorMessage}</Alert>
                <p>
                  <Link to={`/login`}>
                    Faire une nouvelle demande de connexion
                  </Link>
                </p>
              </div>
            )}
            {this.props.loading && (
              <FontAwesomeIcon icon={faSpinner} size="4x" spin />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MagicLink;
