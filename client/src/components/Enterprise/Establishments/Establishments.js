import React from "react";
import Establishment from "./Establishment";

class Establishments extends React.Component {
  render() {
    let establishments = this.props.establishments.map(
      (establishment, index) => (
        <article key={index}>
          <Establishment establishment={establishment} />
        </article>
      )
    );

    return (
      <aside className="aside-contain establishments-aside col-md-3">
        <section>
          <h1 className="h5">Entreprise [name]</h1>

          <dl className="row">
            <dt className="col-md-4">Raison Sociale</dt>
            <dd className="definition col-md-8">[Raison Sociale]</dd>

            <dt className="col-md-4">SIREN</dt>
            <dd className="definition col-md-8">[SIREN]</dd>
          </dl>
        </section>

        <hr />

        <section>
          <h1 className="h5">Établissement siège / principal</h1>

          <Establishment establishment={this.props.headOffice} />
        </section>

        <hr />

        <section>
          <h1 className="h5">Établissements en Occitanie</h1>

          {establishments}
        </section>
      </aside>
    );
  }
}

export default Establishments;
