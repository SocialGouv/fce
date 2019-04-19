import React from "react";
import { Redirect } from "react-router-dom";
import Establishment from "./Establishment";
import Value from "../../../elements/Value";
import { faBuilding, faFileAlt } from "@fortawesome/fontawesome-pro-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Config from "../../../services/Config";
class Establishments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToEnterprise: false,
      isRedirectedToResearch: false,
      limit: true
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

    const sliceLimit = Config.get("sidebardEstablishmentsLimit");

    const establishmentsList = this.state.limit
      ? establishments.slice(0, sliceLimit)
      : establishments;

    const establishmentsItems = establishmentsList.map(
      (establishment, index) => (
        <article key={index}>
          <Establishment establishment={establishment} effectif={false} />
        </article>
      )
    );

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
                <span className="icon">
                  <FontAwesomeIcon icon={faFileAlt} />
                </span>
                <span>Voir la fiche entreprise</span>
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

            {establishments.length > sliceLimit && (
              <button
                className="row button is-primary has-text-light h-center mt-4"
                onClick={() => {
                  this.setState(prevState => ({ limit: !prevState.limit }));
                }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <span>
                  {this.state.limit
                    ? "Voir tous les établissements"
                    : "Réduire la liste des établissements"}
                </span>
              </button>
            )}
          </section>
        </aside>
      </>
    );
  }
}

export default Establishments;
