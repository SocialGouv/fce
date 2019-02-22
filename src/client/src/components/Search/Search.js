import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

class Search extends React.Component {
  render() {
    return (
      <div className="app-search">
        <div className="columns app-search--container">
          <div className="column is-offset-3-desktop is-offset-2-tablet is-6-desktop is-8-tablet search">
            <h1 className="title">
              Rechercher un établissement ou une entreprise
            </h1>

            {this.props.hasError ? (
              <div className="alert is-danger">
                Une erreur est survenue lors de la communication avec l'API
              </div>
            ) : (
              ""
            )}

            <form className="form search-div" onSubmit={this.props.search}>
              <div className="field is-grouped is-grouped-centered">
                <div className="control is-expanded">
                  <input
                    type="text"
                    name="term"
                    id="term"
                    className="input is-large"
                    required
                    placeholder="SIRET, SIREN, raison sociale, nom"
                    onChange={evt => this.props.updateForm(evt)}
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="action button is-primary has-text-light is-large"
                  >
                    {this.props.loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      "Rechercher"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="columns app-search--container">
          <div className="column is-offset-3-desktop is-offset-2-tablet is-6-desktop is-8-tablet advanced-search--link">
            <Link to="/search/advanced">Recherche avancée</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
