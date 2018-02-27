import React from "react";
import "./enterprise.css";
import { Row, Col } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import {
  EstablishmentActivity,
  EstablishmentIdentity,
  Finances,
  Interventions,
  Direccte
} from "./Sections";

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
          <Col className="aside-box" md="2">
            <QuickAccess sections={this.getSections()} />
          </Col>
          <Col className="main" md="7">
            <h1 className="title">Fiche Établissement</h1>

            <EstablishmentIdentity className="bg-info" />
            <EstablishmentActivity />
            <Finances />
            <Interventions />
            <Direccte />
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

export default Establishment;
