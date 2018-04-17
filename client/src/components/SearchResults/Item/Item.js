import React from "react";
import { withRouter } from "react-router-dom";
import Value from "../../../elements/Value";

class Item extends React.Component {
  render() {
    const { item: enterprise } = this.props;
    const establishment = enterprise.etablissement;

    return (
      <tr
        onClick={e =>
          this.props.history.push("/establishment/" + establishment.siret)
        }
        className="result-item"
      >
        <td>
          <Value value={establishment.siret} empty="-" />
        </td>
        <td>
          <Value value={enterprise.siren} empty="-" />
        </td>
        <td>
          <Value
            value={enterprise.raison_sociale || enterprise.nom}
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.etat_etablissement &&
              establishment.etat_etablissement.label
            }
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.code_postal &&
              `${establishment.adresse_components.code_postal}\u00A0(${
                establishment.adresse_components.localite
              })`
            }
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.code_postal &&
              establishment.adresse_components.code_postal.substr(0, 2)
            }
            empty="-"
          />
        </td>
        <td>
          <Value value={establishment.activite} empty="-" />
        </td>
        <td>
          <Value value={establishment.categorie_etablissement} empty="-" />
        </td>
        <td>
          <Value value={establishment.totalInteractions} empty="-" />
        </td>
        <td>
          <Value
            value={
              establishment.interactions && establishment.interactions["C"]
            }
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.interactions && establishment.interactions["3E"]
            }
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.interactions && establishment.interactions["T"]
            }
            empty="-"
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(Item);
