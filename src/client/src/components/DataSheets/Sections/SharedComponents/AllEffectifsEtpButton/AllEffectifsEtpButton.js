import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Http from "../../../../../services/Http";
import Button from "../../../../shared/Button";

import "./allEffectifsEtpButton.scss";

const AllEffectifsEtpButton = ({ type, identifier, setAllEffectifsEtp }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="all-effectifs-etp-button">
      <Button
        onClick={e => {
          setIsLoading(true);
          e.preventDefault();

          Http.get(`/etp-staff/${type}/${identifier}`)
            .then(res => setAllEffectifsEtp(res.data))
            .catch(e => {
              console.error(e);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
        value="Afficher tous les effectifs ETP"
        buttonClasses={classNames("is-primary", {
          "is-loading": isLoading
        })}
      />
    </div>
  );
};

AllEffectifsEtpButton.propTypes = {
  type: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  setAllEffectifsEtp: PropTypes.func.isRequired
};

export default AllEffectifsEtpButton;
