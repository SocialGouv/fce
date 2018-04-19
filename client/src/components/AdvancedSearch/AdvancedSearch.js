import React from "react";
import "./advancedSearch.css";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Alert,
  Button,
  Input
} from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import { faTimes } from "@fortawesome/fontawesome-pro-light";
import { DropdownList, Multiselect } from "react-widgets/lib";
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
              <Row>
                <Label for="siren" md={3}>
                  SIREN
                </Label>
                <Col md={8}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="siren"
                      id="siren"
                      placeholder="SIREN de l'entreprise"
                      onChange={evt =>
                        this.props.updateForm("siren", evt.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Label for="raisonSociale" md={3}>
                  Raison Sociale / Nom
                </Label>
                <Col md={8}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="raisonSociale"
                      id="raisonSociale"
                      placeholder="Raison sociale ou Nom"
                      onChange={evt =>
                        this.props.updateForm("raisonSociale", evt.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup row>
                <Label for="naf" md={3}>
                  Code NAF
                </Label>
                <Col md={8}>
                  <DropdownList
                    data={this.props.autocompleteData.nafCodes}
                    value={this.props.terms.naf}
                    valueField="code"
                    textField={nafCode =>
                      `${nafCode.code} - ${nafCode.libelle}`
                    }
                    filter
                    id="naf"
                    name="naf"
                    placeholder="Code NAF"
                    onChange={value => this.props.updateForm("naf", value.code)}
                  />
                </Col>
                <Col className="dropdown-close" md={1}>
                  {this.props.terms.naf ? (
                    <Button
                      className="button"
                      color="link"
                      title="Supprimer la valeur"
                      onClick={e => this.props.updateForm("naf", null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="commune" md={3}>
                  Commune
                </Label>
                <Col md={8}>
                  <DropdownList
                    data={this.props.autocompleteData.communes}
                    value={this.props.terms.commune}
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
                <Col className="dropdown-close" md={1}>
                  {this.props.terms.commune ? (
                    <Button
                      className="button"
                      color="link"
                      title="Supprimer la valeur"
                      onClick={e => this.props.updateForm("commune", null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="codePostal" md={3}>
                  Code postal
                </Label>
                <Col md={8}>
                  <DropdownList
                    data={this.props.autocompleteData.postalCodes}
                    value={this.props.terms.codePostal}
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
                <Col className="dropdown-close" md={1}>
                  {this.props.terms.codePostal ? (
                    <Button
                      className="button"
                      color="link"
                      title="Supprimer la valeur"
                      onClick={e => this.props.updateForm("codePostal", null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="departement" md={3}>
                  Département
                </Label>
                <Col md={8}>
                  <DropdownList
                    data={this.props.autocompleteData.departements}
                    value={this.props.terms.departement}
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
                <Col className="dropdown-close" md={1}>
                  {this.props.terms.departement ? (
                    <Button
                      className="button"
                      color="link"
                      title="Supprimer la valeur"
                      onClick={e => this.props.updateForm("departement", null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="interactions" md={3}>
                  Interactions Direccte
                </Label>
                <Col md={8}>
                  <Multiselect
                    data={this.props.autocompleteData.polesInteractions}
                    value={this.props.terms.interactions}
                    valueField="value"
                    textField="label"
                    filter
                    id="interactions"
                    name="interactions"
                    placeholder="Interactions avec la Direccte"
                    onChange={value =>
                      this.props.updateForm("interactions", value)
                    }
                  />
                </Col>
                <Col className="dropdown-close" md={1}>
                  {this.props.terms.interactions.length ? (
                    <Button
                      className="button"
                      color="link"
                      title="Supprimer la valeur"
                      onClick={e => this.props.updateForm("interactions", [])}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>

              <Row>
                <Col md={{ size: 9, offset: 3 }}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="siegeSocial"
                        id="siegeSocial"
                        onChange={evt =>
                          this.props.updateForm(
                            "siegeSocial",
                            evt.target.checked
                          )
                        }
                      />
                      Uniquement les établissements principaux
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

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
