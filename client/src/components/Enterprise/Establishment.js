import React from "react";
import withLoading from "../../services/Loading";
import "./enterprise.css";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import {
  EstablishmentActivity,
  EstablishmentIdentity,
  Finances,
  Interventions,
  Direccte
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-light";

class Establishment extends React.Component {
  getSections = () => {
    return [
      { name: "Identité", id: "identity" },
      { name: "État", id: "activity" },
      { name: "Eco & Fina.", id: "finances" },
      { name: "Dév. Eco", id: "development" },
      { name: "Emploi", id: "job" },
      { name: "Mutat. éco.", id: "mutations" },
      { name: "DIRECCTE", id: "direccte" }
    ];
  };

  render() {
    return (
      <section className="app-enterprise">
        <Row>
          <Col className="aside-box d-print-none" md="2">
            <QuickAccess sections={this.getSections()} />
          </Col>
          <Col className="main" md="7">
            <h1 className="title">Fiche Établissement</h1>

            <div className="task-bar d-print-none">
              <Button color="primary" onClick={() => window.print()}>
                <FontAwesomeIcon icon={faPrint} /> Imprimer
              </Button>
            </div>

            <EstablishmentIdentity className="bg-info" />
            <EstablishmentActivity />
            <Finances />
            <Interventions />
            <Direccte />
          </Col>
          <Col className="aside-box d-print-none" md="3">
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
