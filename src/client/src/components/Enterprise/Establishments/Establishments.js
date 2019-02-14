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
      <aside className="aside-contain establishments-aside column is-3 is-12-tablet">
        <section>
          <h3 className="title is-size-5">
            Entreprise <Value value={enterprise.raison_sociale} empty="-" />
          </h3>

          <dl className="columns">
            <dt className="column is-4">Raison Sociale</dt>
            <dd className="definition column is-8">
              <Value value={enterprise.raison_sociale} empty="-" />
            </dd>
          </dl>
          <dl className="columns">
            <dt className="column is-4">SIREN</dt>
            <dd className="definition column is-8">
              <Link to={`/enterprise/${enterprise.siren}`}>
                <Value value={enterprise.siren} empty="-" />
              </Link>
            </dd>
          </dl>
        </section>

        <hr />

        <section>
          <h3 className="title is-size-5">Siège social</h3>

          <Establishment establishment={headOffice} />
        </section>

        <hr />

        <section>
          <h3 className="title is-size-5">Établissements</h3>

          {establishmentsItems}
        </section>
      </aside>
    );
  }
}

export default Establishments;
