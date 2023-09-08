import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

import { useSidebarData } from "../../Sidebar/Sidebar.gql";

const EstablishmentContext = createContext();

export const EstablishmentProvider = ({ siren, children }) => {
  const {
    loading,
    data: entreprise,
    error,
  } = useSidebarData(siren, {
    limit: undefined,
  });

  const sharedData = { data: entreprise, error, loading };

  return (
    <EstablishmentContext.Provider value={sharedData}>
      {children}
    </EstablishmentContext.Provider>
  );
};

EstablishmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  siren: PropTypes.string,
};
export const useEstablishmentData = () => useContext(EstablishmentContext);
