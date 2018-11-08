import React from "react";
import { Link } from "react-router-dom";
import "./search.css";
import { Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

class Search extends React.Component {
  render() {
    return (
      <div className="app-search">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">
              Rechercher un établissement ou une entreprise
            </h1>

            {this.props.hasError ? (
              <Alert color="danger">
                Une erreur est survenue lors de la communication avec l'API
              </Alert>
            ) : (
              ""
            )}

            <Form className="search-form" inline onSubmit={this.props.search}>
              <FormGroup className="col-md-9">
                <Input
                  type="text"
                  name="term"
                  id="term"
                  className="field"
                  required
                  placeholder="SIRET, SIREN, raison sociale, nom"
                  onChange={evt => this.props.updateForm(evt)}
                />
              </FormGroup>

              <FormGroup className="col-md-3">
                <Button className="action" color="primary">
                  {this.props.loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Rechercher"
                  )}
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <Link to="/search/advanced">Recherche avancée</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
