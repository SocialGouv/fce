import React from "react";
import { Link } from "react-router-dom";
import withLoading from "../../services/Loading";
import "./enterprise.css";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import MailTo from "./MailTo";
import Value from "../../elements/Value";
import {
  EstablishmentActivity,
  EstablishmentIdentity,
  EstablishmentEnterpriseIdentity,
  Interventions,
  Direccte,
  Relation
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint, faArrowAltLeft } from "@fortawesome/fontawesome-pro-light";

class Establishment extends React.Component {
  getSections = () => {
    return [
      { name: "Identité Ent.", id: "identity-en" },
      { name: "Identité Eta.", id: "identity-et" },
      { name: "État et activité", id: "activity" },
      { name: "Relation travail", id: "relation" },
      { name: "Dév. Eco", id: "development" },
      { name: "Emploi", id: "job" },
      { name: "Mutat. éco.", id: "mutations" },
      { name: "Intéractions DIRECCTE", id: "direccte" }
    ];
  };

  render() {
    const { establishment, enterprise } = this.props;

    return (
      <section className="app-enterprise">
        <Row>
          <Col className="aside-box d-print-none" md="2">
            <QuickAccess sections={this.getSections()} />
          </Col>
          <Col className="main" md="7">
            <h2 className="subtitle">Fiche Établissement</h2>

            <h1 className="title">
              <Value
                value={establishment.enseigne}
                empty={enterprise.raison_sociale}
              />
            </h1>

            <div className="task-bar d-print-none">
              {this.props.hasSearchResults ? (
                <Link className="btn btn-secondary" to={`/search/results`}>
                  <FontAwesomeIcon icon={faArrowAltLeft} /> Retour aux résultats
                </Link>
              ) : (
                ""
              )}
              <Button color="primary" onClick={() => window.print()}>
                <FontAwesomeIcon icon={faPrint} /> Imprimer
              </Button>
              <MailTo
                type="establishment"
                enterprise={enterprise}
                establishment={establishment}
              />
            </div>

            <EstablishmentEnterpriseIdentity
              enterprise={this.props.enterprise}
              headOffice={this.props.headOffice}
            />
            <EstablishmentIdentity
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
              headOffice={this.props.headOffice}
              className="bg-info"
            />
            <EstablishmentActivity
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
            />
            <Relation establishment={this.props.establishment} />
            <Interventions
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
            />
            <Direccte
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
            />
          </Col>
          <Col className="aside-box" md="3">
            <Establishments
              enterprise={this.props.enterprise}
              headOffice={this.props.headOffice}
              establishments={this.props.establishments}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

export default withLoading(Establishment);
