import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import "./login.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <Container className="app-login">
        <Row className="justify-content-md-center">
          <Col xl="3" md="4">
            <Form className="login-form bg-light" onSubmit={this.props.login}>
              <FormGroup>
                <Label for="username">Identifiant</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  required
                  onChange={evt => this.props.updateForm(evt)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  required
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
