import React from "react";
import withLoading from "../../services/Loading";
import "./enterprise.css";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import { EnterpriseIdentity, EnterpriseActivity } from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-light";

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
          <Col className="aside-box d-print-none" md="2">
            <QuickAccess sections={this.getSections()} />
          </Col>
          <Col className="main" md="7">
            <h1 className="title">Fiche Entreprise</h1>

            <div className="task-bar d-print-none">
              <Button color="primary" onClick={() => window.print()}>
                <FontAwesomeIcon icon={faPrint} /> Imprimer
              </Button>
            </div>

            <EnterpriseIdentity />
            <EnterpriseActivity />
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

export default withLoading(Enterprise);
