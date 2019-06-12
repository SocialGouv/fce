import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import "./login.scss";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <Container className="app-login">
        <Row className="justify-content-md-center">
          <Col xl="12" md="12">
            <Form className="login-form bg-light" onSubmit={this.props.login}>
              {this.props.hasSuccess && (
                <Alert color="success">
                  Un lien magique vous a été envoyé par email afin de pouvoir
                  vous connecter
                </Alert>
              )}
              {this.props.hasError && (
                <Alert color="danger">{this.props.errorMessage}</Alert>
              )}

              <FormGroup>
                <Label for="email">Adresse Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  invalid={this.props.hasError}
                  onChange={evt => this.props.updateForm(evt)}
                />
              </FormGroup>

              <div className="d-flex justify-content-center">
                <Button color="primary">
                  {this.props.loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Connexion"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
