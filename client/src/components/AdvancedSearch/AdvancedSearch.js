import React from "react";
import "./advancedSearch.css";
import { Row, Col, Form, FormGroup, Label, Alert, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import DropdownList from "react-widgets/lib/DropdownList";
import withLoading from "../../services/Loading";

class AdvancedSearch extends React.Component {
  render() {
    return (
      <div className="app-advancedSearch">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Rechercher une liste d'établissements</h1>
            <Form className="advancedSearch-form" onSubmit={this.props.search}>
              {this.props.hasError && this.props.errorMessage ? (
                <Alert color="danger">{this.props.errorMessage}</Alert>
              ) : (
                ""
              )}
              <FormGroup row>
                <Label for="naf" md={3}>
                  Code NAF
                </Label>
                <Col md={9}>
                  <DropdownList
                    data={this.props.autocompleteData.nafCodes}
                    valueField="code"
                    textField="text"
                    filter
                    id="naf"
                    name="naf"
                    placeholder="Code NAF"
                    onChange={value => this.props.updateForm("naf", value.code)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="commune" md={3}>
                  Nom commune
                </Label>
                <Col md={9}>
                  <DropdownList
                    data={this.props.autocompleteData.communes}
                    valueField="libelle_commune"
                    textField="libelle_commune"
                    filter
                    id="commune"
                    name="commune"
                    placeholder="Commune"
                    onChange={value =>
                      this.props.updateForm("commune", value.libelle_commune)
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="codePostal" md={3}>
                  Code postal
                </Label>
                <Col md={9}>
                  <DropdownList
                    data={this.props.autocompleteData.postalCodes}
                    valueField="code_postal"
                    textField="code_postal"
                    filter
                    id="codePostal"
                    name="codePostal"
                    placeholder="Code postal"
                    onChange={value =>
                      this.props.updateForm("codePostal", value.code_postal)
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="departement" md={3}>
                  Département
                </Label>
                <Col md={9}>
                  <DropdownList
                    data={this.props.autocompleteData.departements}
                    valueField="code_departement"
                    textField="code_departement"
                    filter
                    id="departement"
                    name="departement"
                    placeholder="Département"
                    onChange={value =>
                      this.props.updateForm(
                        "departement",
                        value.code_departement
                      )
                    }
                  />
                </Col>
              </FormGroup>

              <div className="d-flex justify-content-center">
                <Button color="primary" disabled={this.props.searchLoading}>
                  {this.props.searchLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Rechercher"
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

export default withLoading(AdvancedSearch);
