import React, { useState } from "react";
import PropTypes from "prop-types";
import Http from "../../services/Http";
import AllEffectifsEtpButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsEtpButton = ({ type, identifier, setAllEffectifsEtp }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllEffectifsEtp = ({
    type,
    identifier,
    setAllEffectifsEtp,
    setIsLoading
  }) => e => {
    setIsLoading(true);
    e.preventDefault();

    Http.get(`/etp-staff/${type}/${identifier}`)
      .then(res => {
        setIsLoading(false);
        setAllEffectifsEtp(res.data);
      })
      .catch(e => {
        setIsLoading(false);
        console.error(e);
      });
  };

  return (
    <AllEffectifsEtpButtonView
      getAllEffectifs={getAllEffectifsEtp({
        type,
        identifier,
        setAllEffectifsEtp,
        setIsLoading
      })}
      value="Afficher tous les effectifs ETP"
      isLoading={isLoading}
    />
  );
};

AllEffectifsEtpButton.propTypes = {
  type: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  setAllEffectifsEtp: PropTypes.func.isRequired
};

export default AllEffectifsEtpButton;
