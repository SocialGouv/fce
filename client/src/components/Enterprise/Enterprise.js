import React from "react";
import withLoading from "../../services/Loading";
import "./enterprise.css";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import Value from "../../elements/Value";
import {
  EnterpriseIdentity,
  EnterpriseActivity,
  EnterpriseHeadOffice,
  Mandataires,
  Finances
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-light";

class Enterprise extends React.Component {
  getSections = () => {
    return [
      { name: "Identité", id: "identity" },
      { name: "État et activité", id: "activity" },
      { name: "Siège social", id: "headoffice" },
      { name: "Eco & Fina.", id: "finances" },
      { name: "Mandataires", id: "mandataire" }
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
              <Button color="primary" onClick={() => window.print()}>
                <FontAwesomeIcon icon={faPrint} /> Imprimer
              </Button>
            </div>

            <EnterpriseIdentity enterprise={enterprise} />
            <EnterpriseActivity enterprise={enterprise} />
            <EnterpriseHeadOffice headOffice={headOffice} />
            <Finances establishment={headOffice} />
            <Mandataires enterprise={enterprise} />
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
