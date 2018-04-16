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
          <Value value={enterprise.raison_sociale} empty="-" />
        </td>
        <td>
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.localite
            }
            empty="-"
          />
        </td>
        <td>
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.code_postal
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
      </tr>
    );
  }
}

export default withRouter(Item);
