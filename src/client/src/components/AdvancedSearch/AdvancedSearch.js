import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import { faTimes } from "@fortawesome/fontawesome-pro-light";
import { DropdownList } from "react-widgets/lib";
import withLoading from "../../services/Loading";

class AdvancedSearch extends React.Component {
  render() {
    const interactionsOptions = [
      { value: true, label: "N'importe quel pôle" },
      ...this.props.autocompleteData.polesInteractions
    ];

    return (
      <div className="app-advancedSearch">
        <div className="columns app-search--container">
          <div className="column is-offset-3-desktop is-offset-2-tablet is-6-desktop is-8-tablet search">
            <h1 className="title">Rechercher une liste d'établissements</h1>
            <form
              className="form advancedSearch-form"
              onSubmit={this.props.search}
            >
              {this.props.hasError && this.props.errorMessage ? (
                <div className="message is-danger">
                  <div className="message-body">{this.props.errorMessage}</div>
                </div>
              ) : (
                ""
              )}
              <div className="field is-horizontal">
                <div className="field-label is-normal" for="siren">
                  SIREN
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input
                        type="text"
                        name="siren"
                        id="siren"
                        className="input"
                        placeholder="SIREN de l'entreprise"
                        onChange={evt =>
                          this.props.updateForm("siren", evt.target.value)
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal" for="raisonSociale">
                  Raison Sociale
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input
                        type="text"
                        name="raisonSociale"
                        id="raisonSociale"
                        className="input"
                        placeholder="Raison sociale ou Nom"
                        onChange={evt =>
                          this.props.updateForm(
                            "raisonSociale",
                            evt.target.value
                          )
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal" for="naf">
                  Code NAF
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <DropdownList
                        data={this.props.autocompleteData.nafCodes}
                        value={this.props.terms.naf}
                        valueField="code"
                        textField={nafCode =>
                          `${nafCode.code} - ${nafCode.libelle}`
                        }
                        filter
                        id="naf"
                        name="naf"
                        placeholder="Code NAF"
                        onChange={value =>
                          this.props.updateForm("naf", value.code)
                        }
                      />
                    </p>
                  </div>
                  {/* <div className="field dropdown-close">
                    {this.props.terms.naf ? (
                      <button
                        className="button is-primary"
                        color="link"
                        title="Supprimer la valeur"
                        onClick={e => this.props.updateForm("naf", null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal" for="commune">
                  Commune
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <DropdownList
                        data={this.props.autocompleteData.communes}
                        value={this.props.terms.commune}
                        valueField="libelle_commune"
                        textField="libelle_commune"
                        filter
                        id="commune"
                        name="commune"
                        placeholder="Commune"
                        onChange={value =>
                          this.props.updateForm(
                            "commune",
                            value.libelle_commune
                          )
                        }
                      />
                    </p>
                  </div>
                  {/* <div className="field dropdown-close">
                    {this.props.terms.commune ? (
                      <button
                        className="button is-primary"
                        color="link"
                        title="Supprimer la valeur"
                        onClick={e => this.props.updateForm("commune", null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal" for="codePostal">
                  Code postal
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <DropdownList
                        data={this.props.autocompleteData.postalCodes}
                        value={this.props.terms.codePostal}
                        valueField="code_postal"
                        textField="code_postal"
                        filter
                        id="codePostal"
                        name="codePostal"
                        placeholder="Code postal"
                        onChange={value =>
                          this.props.updateForm("codePostal", value.code_postal)
                        }
                      />
                    </p>
                  </div>
                  {/* <div className="field dropdown-close">
                    {this.props.terms.codePostal ? (
                      <button
                        className="button is-primary"
                        color="link"
                        title="Supprimer la valeur"
                        onClick={e => this.props.updateForm("codePostal", null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal" for="departement">
                  Département
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <DropdownList
                        data={this.props.autocompleteData.departements}
                        value={this.props.terms.departement}
                        valueField="code_departement"
                        textField="code_departement"
                        filter
                        id="departement"
                        name="departement"
                        placeholder="Département"
                        onChange={value =>
                          this.props.updateForm(
                            "departement",
                            value.code_departement
                          )
                        }
                      />
                    </p>
                  </div>
                  {/* <div className="field dropdown-close">
                    {this.props.terms.departement ? (
                      <button
                        className="button is-primary"
                        color="link"
                        title="Supprimer la valeur"
                        onClick={e => this.props.updateForm("departement", null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal" for="interactions">
                  Interactions Direccte
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <DropdownList
                        data={interactionsOptions}
                        value={
                          this.props.terms.interactions &&
                          this.props.terms.interactions.length ===
                            this.props.autocompleteData.polesInteractions.length
                            ? interactionsOptions[0]
                            : this.props.terms.interactions[0]
                        }
                        valueField="value"
                        textField="label"
                        filter
                        id="interactions"
                        name="interactions"
                        placeholder="Interactions avec la Direccte"
                        onChange={option => {
                          const value =
                            option.value === true
                              ? this.props.autocompleteData.polesInteractions
                              : [option];
                          return this.props.updateForm("interactions", value);
                        }}
                      />
                    </p>
                  </div>
                  {/* <div className="field dropdown-close">
                    {this.props.terms.interactions.length ? (
                      <button
                        className="button is-primary"
                        color="link"
                        title="Supprimer la valeur"
                        onClick={e => this.props.updateForm("interactions", null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="field">
                <label class="checkbox">
                  <input
                    type="checkbox"
                    name="siegeSocial"
                    id="siegeSocial"
                    onChange={evt =>
                      this.props.updateForm("siegeSocial", evt.target.checked)
                    }
                  />
                  Uniquement les établissements principaux
                </label>
              </div>

              <div className="field button-field">
                <button
                  type="submit"
                  className="button is-primary is-large"
                  disabled={this.props.searchLoading}
                >
                  {this.props.searchLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Rechercher"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withLoading(AdvancedSearch);
