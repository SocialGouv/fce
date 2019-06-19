import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import AsyncSelect from "react-select/lib/Async";
import Select from "react-select";
import Config from "../../services/Config";

class Search extends React.Component {
  render() {
    const selectCustomStyles = {
      option: (provided, state) => ({
        ...provided,
        color: "#353535"
      })
    };

    const { terms, hasError, search, nafList } = this.props;

    return (
      <div className="app-search pb-4">
        <div className="columns app-search--container">
          <div className="column is-offset-2-desktop is-offset-2-tablet is-8-desktop is-8-tablet search">
            <h2 className="title pb-2">
              Retrouvez les informations légales et administratives des
              entreprises
            </h2>

            <p className="lead pb-4">
              L'état civil, l'activité et les données de l'administration dans
              une seule fiche entreprise accessible pour les agents publics
            </p>

            {hasError ? (
              <div className="notification is-danger">
                Une erreur est survenue lors de la communication avec l'API
              </div>
            ) : (
              ""
            )}

            <form className="form search-form" onSubmit={search}>
              <div className="field is-grouped is-grouped-centered">
                <div className="control is-expanded">
                  <input
                    type="text"
                    name="q"
                    id="term"
                    className="input is-medium"
                    placeholder="SIRET, SIREN, raison sociale, nom"
                    onChange={evt => this.props.updateForm(evt)}
                    value={terms.q || ""}
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="action button is-outlined is-light is-medium"
                  >
                    {this.props.loading ? (
                      <span className="icon">
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      "Rechercher"
                    )}
                  </button>
                </div>
              </div>

              <div className="columns">
                <div className="column is-one-fifth">
                  <div className="field">
                    <input
                      className="is-checkradio is-light"
                      type="checkbox"
                      name="siegeSocial"
                      id="siegeSocial"
                      onChange={evt => this.props.updateForm(evt)}
                      checked={!!terms.siegeSocial}
                    />
                    <label htmlFor="siegeSocial" className="check-radio-label">
                      Siège social
                    </label>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="field">
                    <div className="control">
                      <Select
                        id="naf"
                        name="naf"
                        options={nafList}
                        onChange={value =>
                          this.props.updateFormSelect("naf", value)
                        }
                        noOptionsMessage={term => "Aucun résultat"}
                        placeholder="Code NAF ou libellé"
                        isClearable
                        isMulti
                        value={terms._nafSelect}
                        styles={selectCustomStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="field">
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
                          term.inputValue.length >=
                          Config.get("advancedSearch").minTerms
                            ? "Aucun résultat"
                            : `Veuillez saisir au moins ${
                                Config.get("advancedSearch").minTerms
                              } caractères`
                        }
                        placeholder="Commune ou code postal"
                        isClearable
                        value={terms._communeSelect}
                        styles={selectCustomStyles}
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
