import React from "react";
import "./admin.css";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
  Label
} from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

class Admin extends React.Component {
  render() {
    return (
      <div className="app-admin">
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1 className="title">Administration</h1>

            <Form className="import-form bg-light" onSubmit={this.props.submit}>
              {this.props.hasError ? (
                <Alert color="danger">
                  Impossible de sauvegarder les fichiers
                </Alert>
              ) : (
                ""
              )}

              {this.props.success ? (
                <Alert color="success">
                  Les fichiers ont été importés avec succès
                </Alert>
              ) : (
                ""
              )}

              <FormGroup row>
                <Label for="siene" md={4}>
                  Fichier base SIENE
                </Label>
                <Col md={8}>
                  <Input type="file" name="file" id="siene" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="wikit" md={4}>
                  Fichier intéractions pole T (WIKIT)
                </Label>
                <Col md={8}>
                  <Input type="file" name="file" id="wikit" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="sorac" md={4}>
                  Fichier intéractions pole C (SORA)
                </Label>
                <Col md={8}>
                  <Input type="file" name="file" id="sorac" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="sora3e" md={4}>
                  Fichier intéractions pole 3E (SORA)
                </Label>
                <Col md={8}>
                  <Input type="file" name="file" id="sora3e" />
                </Col>
              </FormGroup>

              <div className="d-flex justify-content-center">
                <Button color="primary">
                  {this.props.loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Importer"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
