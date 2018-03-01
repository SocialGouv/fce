import React from "react";
import "./admin.css";
import { Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

class Admin extends React.Component {
  render() {
    return (
      <div className="app-admin">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Administration</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
