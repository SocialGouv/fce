import React from "react";
import { Redirect } from "react-router-dom";
import Establishment from "./Establishment";
import Value from "../../../elements/Value";
import { faBuilding } from "@fortawesome/fontawesome-pro-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class Establishments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToEnterprise: false,
      isRedirectedToResearch: false
    };
  }

  render() {
    const {
      establishments,
      enterprise,
      headOffice,
      isEstablishmentDisplayed
    } = this.props;
    const { isRedirectedToEnterprise, isRedirectedToResearch } = this.state;

    let establishmentsItems = establishments
      .slice(0, 20)
      .map((establishment, index) => (
        <article key={index}>
          <Establishment establishment={establishment} effectif={false} />
        </article>
      ));

    return (
      <>
        {isRedirectedToEnterprise && (
          <Redirect to={`/enterprise/${enterprise.siren}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <aside
          className={`${
            isEstablishmentDisplayed ? "establishment" : "enterprise"
          } aside-contain establishments-aside column is-3-desktop is-12-tablet`}
        >
          <section className="pb-6">
            <h3 className="title is-size-5">
              Entreprise <Value value={enterprise.raison_sociale} empty="-" />
            </h3>
            <h5 className="has-text-grey has-text-weight-semibold">
              {enterprise.libelle_naf}
            </h5>
            {isEstablishmentDisplayed && (
              <button
                className="button is-primary has-text-light"
                onClick={() => {
                  this.setState({ isRedirectedToEnterprise: true });
                }}
              >
                Voir la fiche entreprise
              </button>
            )}
          </section>

          <section>
            <h3 className="title is-size-5">Siège social</h3>

            <Establishment establishment={headOffice} />
          </section>

          <hr />

          <section>
            <h3 className="title is-size-5">
              {establishments.length} Établissements
            </h3>

            {establishmentsItems}

            <button
              className="row button is-primary has-text-light h-center mt-4"
              onClick={() => {
                this.setState({ isRedirectedToResearch: true });
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faBuilding} />
              </span>
              <span>Voir tous les établissements</span>
            </button>
          </section>
        </aside>
      </>
    );
  }
}

export default Establishments;
