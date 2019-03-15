import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import AsyncSelect from "react-select/lib/Async";
import Config from "../../services/Config";

class Search extends React.Component {
  render() {
    return (
      <div className="app-search">
        <div className="columns app-search--container">
          <div className="column is-offset-2-desktop is-offset-2-tablet is-8-desktop is-8-tablet search">
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
                    name="q"
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

              <div className="columns">
                <div className="column is-one-quarter">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="siegeSocial"
                      onChange={evt => this.props.updateForm(evt)}
                    />
                    Siège social
                  </label>
                </div>
                <div className="column is-one-quarter">
                  <div className="field">
                    <label className="label" htmlFor="naf">
                      Activité
                    </label>
                    <div className="control">
                      <AsyncSelect
                        id="naf"
                        name="naf"
                        defaultOptions={[]}
                        loadOptions={this.props.loadNaf}
                        onChange={value =>
                          this.props.updateFormSelect("naf", value)
                        }
                        loadingMessage={() => "Chargement..."}
                        noOptionsMessage={term =>
                          term.length >= Config.get("advancedSearch").minTerms
                            ? "Aucun résultat"
                            : "Veuillez saisir au moins 4 caractères"
                        }
                        placeholder="Code NAF ou libellé"
                        isClearable
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-one-quarter">
                  <div className="field">
                    <label className="label" htmlFor="commune">
                      Commune
                    </label>
                    <div className="control">
                      <AsyncSelect
                        id="commune"
                        name="commune"
                        defaultOptions={[]}
                        loadOptions={this.props.loadCommunes}
                        onChange={value =>
                          this.props.updateFormSelect("commune", value)
                        }
                        loadingMessage={() => "Chargement..."}
                        noOptionsMessage={term =>
                          term.length >= Config.get("advancedSearch").minTerms
                            ? "Aucun résultat"
                            : "Veuillez saisir au moins 4 caractères"
                        }
                        placeholder="Nom de commune ou code postal"
                        isClearable
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
