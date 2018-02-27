import React from "react";
import "./enterprise.css";
import { Row, Col } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import { EnterpriseIdentity, EnterpriseActivity } from "./Sections";

class Enterprise extends React.Component {
  getSections = () => {
    return [
      { name: "Identité", id: "identity" },
      { name: "État", id: "activity" }
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
            <h1 className="title">Fiche Entreprise</h1>

            <EnterpriseIdentity />
            <EnterpriseActivity />
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

export default Enterprise;
