import React, { useState } from "react";
import PropTypes from "prop-types";
import Http from "../../services/Http";
import AllEffectifsDsnButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";

const AllEffectifsDsnButton = ({ type, identifier, setAllEffectifsDsn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllEffectifsDsn = ({
    type,
    identifier,
    setAllEffectifsDsn,
    setIsLoading
  }) => e => {
    setIsLoading(true);
    e.preventDefault();

    Http.get(`/dsn-effectif/${type}/${identifier}`)
      .then(res => {
        setIsLoading(false);
        console.log(res.data.data);
        setAllEffectifsDsn(res.data?.data);
      })
      .catch(e => {
        setIsLoading(false);
        console.error(e);
      });
  };

  return (
    <AllEffectifsDsnButtonView
      getAllEffectifs={getAllEffectifsDsn({
        type,
        identifier,
        setAllEffectifsDsn,
        setIsLoading
      })}
      value={"Afficher le détail et l'historique des effectifs"}
      isLoading={isLoading}
    />
  );
};

AllEffectifsDsnButton.propTypes = {
  type: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  setAllEffectifsDsn: PropTypes.func.isRequired
};

export default AllEffectifsDsnButton;
