import React from "react";
import { Link } from "react-router-dom";
import Establishment from "./Establishment";
import Value from "../../../elements/Value";

class Establishments extends React.Component {
  render() {
    const { establishments, enterprise, headOffice } = this.props;

    let establishmentsItems = establishments.map((establishment, index) => (
      <article key={index}>
        <Establishment establishment={establishment} effectif={false} />
      </article>
    ));

    return (
      <aside className="aside-contain establishments-aside col-md-3">
        <section>
          <h1 className="h5">
            Entreprise <Value value={enterprise.raison_sociale} empty="-" />
          </h1>

          <dl className="row">
            <dt className="col-md-4">Raison Sociale</dt>
            <dd className="definition col-md-8">
              <Value value={enterprise.raison_sociale} empty="-" />
            </dd>

            <dt className="col-md-4">SIREN</dt>
            <dd className="definition col-md-8">
              <Link to={`/enterprise/${enterprise.siren}`}>
                <Value value={enterprise.siren} empty="-" />
              </Link>
            </dd>
          </dl>
        </section>

        <hr />

        <section>
          <h1 className="h5">Établissement siège</h1>

          <Establishment establishment={headOffice} />
        </section>

        <hr />

        <section>
          <h1 className="h5">Établissements</h1>

          {establishmentsItems}
        </section>
      </aside>
    );
  }
}

export default Establishments;
