import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

import LoadableContent from "../../../shared/LoadableContent/LoadableContent";
import { useSidebarData } from "../../Sidebar/Sidebar.gql";

const EstablishmentContext = createContext();

export const EstablishmentProvider = ({ siren, children }) => {
  const { loading, data: entreprise, error } = useSidebarData(siren);

  if (loading || error) {
    return null;
  }

  const sharedData = { data: entreprise, error, isLoading: loading };

  return (
    <LoadableContent loading={loading} error={error}>
      <EstablishmentContext.Provider value={sharedData}>
        {children}
      </EstablishmentContext.Provider>
    </LoadableContent>
  );
};

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  siren: PropTypes.string,
};
export const useEstablishmentData = () => useContext(EstablishmentContext);
