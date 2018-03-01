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
  Label,
  FormFeedback
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

              <FormGroup row>
                <Label for="siene" md={4}>
                  Fichier base SIENE
                </Label>
                <Col md={8}>
                  <Input
                    type="file"
                    name="siene"
                    id="siene"
                    className="form-control"
                    valid={
                      this.props.importResponses &&
                      this.props.importResponses.siene &&
                      this.props.importResponses.siene.success
                    }
                    invalid={
                      this.props.importResponses &&
                      this.props.importResponses.siene &&
                      !this.props.importResponses.siene.success
                    }
                    onChange={e => this.props.handleFileUpload(e)}
                  />
                  <FormFeedback valid>
                    Les données ont été importées
                  </FormFeedback>
                  <FormFeedback>Echec de l'import des données</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="wikit" md={4}>
                  Fichier intéractions pole T (WIKIT)
                </Label>
                <Col md={8}>
                  <Input
                    type="file"
                    name="wikit"
                    id="wikit"
                    className="form-control"
                    valid={
                      this.props.importResponses &&
                      this.props.importResponses.wikit &&
                      this.props.importResponses.wikit.success
                    }
                    invalid={
                      this.props.importResponses &&
                      this.props.importResponses.wikit &&
                      !this.props.importResponses.wikit.success
                    }
                    onChange={e => this.props.handleFileUpload(e)}
                  />
                  <FormFeedback valid>
                    Les données ont été importées
                  </FormFeedback>
                  <FormFeedback>Echec de l'import des données</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="sora" md={4}>
                  Fichier intéractions pole C (SORA)
                </Label>
                <Col md={8}>
                  <Input
                    type="file"
                    name="sora"
                    id="sora"
                    className="form-control"
                    valid={
                      this.props.importResponses &&
                      this.props.importResponses.sora &&
                      this.props.importResponses.sora.success
                    }
                    invalid={
                      this.props.importResponses &&
                      this.props.importResponses.sora &&
                      !this.props.importResponses.sora.success
                    }
                    onChange={e => this.props.handleFileUpload(e)}
                  />
                  <FormFeedback valid>
                    Les données ont été importées
                  </FormFeedback>
                  <FormFeedback>Echec de l'import des données</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="eos" md={4}>
                  Fichier intéractions pole 3E (EOS)
                </Label>
                <Col md={8}>
                  <Input
                    type="file"
                    name="eos"
                    id="eos"
                    className="form-control"
                    valid={
                      this.props.importResponses &&
                      this.props.importResponses.eos &&
                      this.props.importResponses.eos.success
                    }
                    invalid={
                      this.props.importResponses &&
                      this.props.importResponses.eos &&
                      !this.props.importResponses.eos.success
                    }
                    onChange={e => this.props.handleFileUpload(e)}
                  />
                  <FormFeedback valid>
                    Les données ont été importées
                  </FormFeedback>
                  <FormFeedback>Echec de l'import des données</FormFeedback>
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
