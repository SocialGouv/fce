import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <li className="result-item">
        <Link
          className="link"
          to={`/establishment/${item.entreprise.siret_siege_social}`}
        >
          <dl className="description-list row bg-light">
            <dt className="col-md-3">Raison Sociale</dt>
            <dd className="definition col-md-9">
              {item.entreprise.raison_sociale}
            </dd>

            <dt className="col-md-3">SIREN</dt>
            <dd className="definition col-md-9">{item.entreprise.siren}</dd>

            <dt className="col-md-3">SIRET</dt>
            <dd className="definition col-md-9">
              {item.entreprise.siret_siege_social}
            </dd>
          </dl>
        </Link>
      </li>
    );
  }
}

export default Item;
