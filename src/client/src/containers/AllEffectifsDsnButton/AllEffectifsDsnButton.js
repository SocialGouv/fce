import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsDsnButtonView from "../../components/DataSheets/Sections/SharedComponents/AllEffectifsButton";
import Http from "../../services/Http";

const AllEffectifsDsnButton = ({ type, identifier, setAllEffectifsDsn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllEffectifsDsn =
    ({ type, identifier, setAllEffectifsDsn, setIsLoading }) =>
    (e) => {
      e.preventDefault();

      setIsLoading(true);

      Http.get(`/dsn-effectif/${type}/${identifier}`)
        .then((res) => {
          setIsLoading(false);
          setAllEffectifsDsn(res.data?.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.error(e);
        });
    };

  return (
    <AllEffectifsDsnButtonView
      getAllEffectifs={getAllEffectifsDsn({
        identifier,
        setAllEffectifsDsn,
        setIsLoading,
        type,
      })}
      value={"Afficher le détail et l'historique des effectifs"}
      isLoading={isLoading}
    />
  );
};

AllEffectifsDsnButton.propTypes = {
  identifier: PropTypes.string.isRequired,
  setAllEffectifsDsn: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default AllEffectifsDsnButton;
