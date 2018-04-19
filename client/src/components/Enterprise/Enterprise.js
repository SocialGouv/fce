import React from "react";
import { Link } from "react-router-dom";
import withLoading from "../../services/Loading";
import "./enterprise.css";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import Value from "../../elements/Value";
import {
  Direccte,
  EnterpriseIdentity,
  EnterpriseActivity,
  EnterpriseHeadOffice,
  Mandataires,
  Finances,
  Attestations
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-light";
import { faArrowAltLeft } from "@fortawesome/fontawesome-pro-light/index";

class Enterprise extends React.Component {
  getSections = () => {
    return [
      { name: "Identité", id: "identity" },
      { name: "État et activité", id: "activity" },
      { name: "Siège social", id: "headoffice" },
      { name: "Eco & Fina.", id: "finances" },
      { name: "Attestations", id: "attestations" },
      { name: "Mandataires", id: "mandataire" },
      { name: "DIRECCTE", id: "direccte" }
    ];
  };

  render() {
    const { enterprise, headOffice } = this.props;

    return (
      <section className="app-enterprise">
        <Row>
          <Col className="aside-box d-print-none" md="2">
            <QuickAccess sections={this.getSections()} />
          </Col>
          <Col className="main" md="7">
            <h2 className="subtitle">Fiche Entreprise</h2>

            <h1 className="title">
              <Value value={enterprise.raison_sociale} empty="-" />
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
            </div>

            <EnterpriseIdentity enterprise={enterprise} />
            <EnterpriseActivity enterprise={enterprise} />
            <EnterpriseHeadOffice headOffice={headOffice} />
            <Finances establishment={headOffice} />
            <Attestations enterprise={enterprise} />
            <Mandataires enterprise={enterprise} />
            <Direccte enterprise={enterprise} />
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

export default withLoading(Enterprise);
