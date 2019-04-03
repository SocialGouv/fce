import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../elements/Value";

const EstablishmentTransfert = ({ predecesseur, successeur, data }) => {
  return data
    ? [
        <div className="columns" key="transfert_label_container">
          <h5 className="column is-size-6 is-3" key="transfert_label">
            SIRET{" "}
            {predecesseur ? "prédécesseur" : successeur ? "successeur" : ""}
          </h5>
          <span className="column is-8" key="transfert_value">
            <Link to={`/establishment/${data.siret}`}>
              <Value value={data.siret} empty="-" />
            </Link>
          </span>
        </div>,
        <div className="columns" key="transfert_date_label_container">
          <h5 className="column is-size-6 is-3" key="transfert_date_label">
            Date du transfert
          </h5>
          <span className="column is-8" key="transfert_date_value">
            <Value value={data.date_transfert} empty="-" />
          </span>
        </div>
      ]
    : null;
};

export default EstablishmentTransfert;
