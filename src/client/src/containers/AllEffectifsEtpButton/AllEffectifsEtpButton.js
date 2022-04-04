import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsEtpButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";
import Http from "../../services/Http";

const AllEffectifsEtpButton = ({ type, identifier, setAllEffectifsEtp }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllEffectifsEtp =
    ({ type, identifier, setAllEffectifsEtp, setIsLoading }) =>
    (e) => {
      e.preventDefault();
      setIsLoading(true);

      Http.get(`/etp-staff/${type}/${identifier}`)
        .then((res) => {
          setIsLoading(false);
          setAllEffectifsEtp(res.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.error(e);
        });
    };

  return (
    <AllEffectifsEtpButtonView
      getAllEffectifs={getAllEffectifsEtp({
        identifier,
        setAllEffectifsEtp,
        setIsLoading,
        type,
      })}
      value="Afficher tous les effectifs ETP"
      isLoading={isLoading}
    />
  );
};

AllEffectifsEtpButton.propTypes = {
  identifier: PropTypes.string.isRequired,
  setAllEffectifsEtp: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AllEffectifsEtpButton;
