import React from "react";
import { Redirect } from "react-router-dom";
import Establishment from "./Establishment";
import EstablishmentsItems from "./EstablishmentsItems";
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
      isLimited: true
    };
  }

  render() {
    const limitItems = Config.get("sidebarEstablishmentsLimit");

    const {
      establishments,
      enterprise,
      headOffice,
      isEstablishmentDisplayed
    } = this.props;

    const { isRedirectedToEnterprise, isRedirectedToResearch } = this.state;

    return (
      <>
        {isRedirectedToEnterprise && (
          <Redirect to={`/enterprise/${enterprise.siren}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <aside
          className={`${
            isEstablishmentDisplayed ? "establishment" : "enterprise"
          } aside-contain establishments-aside column is-12-tablet`}
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

          <p className="title is-size-5">
            {establishments.length} Établissements
          </p>
          <section className="establishments">
            <EstablishmentsItems
              establishments={establishments}
              limit={this.state.isLimited && limitItems}
            />
            {establishments.length > limitItems && this.state.isLimited && (
              <button
                className="button is-primary has-text-light toggle-all-establishments"
                onClick={() => {
                  this.setState({ isLimited: false });
                }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <span>Voir tous les établissements</span>
              </button>
            )}
          </section>
        </aside>
      </>
    );
  }
}

export default Establishments;
