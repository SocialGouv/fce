import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../elements/Value";

class EnterpriseHeadOffice extends React.Component {
  render() {
    const { headOffice } = this.props;

    return (
      <section id="headoffice" className="enterprise-section">
        <h1 className="title h4">Siège social de l'entreprise</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">SIRET</dt>
          <dd className="dd col-md-8">
            <Link to={`/establishment/${headOffice.siret}`}>
              <Value value={headOffice.siret} empty="" />
            </Link>
          </dd>

          <dt className="dt col-md-4">Adresse</dt>
          <dd className="dd col-md-8">
            <Value value={headOffice.adresse} empty="-" />
          </dd>

          <dt className="dt col-md-4">Date de création</dt>
          <dd className="dd col-md-8">
            <Value value={headOffice.date_creation} empty="-" />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EnterpriseHeadOffice;
