import "../../dataSheets.scss";

import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";

// import Unsubscribe from "../../../../containers/Unsubscribe";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import withLoading from "../../../../services/withLoading";
import ListEstablishment from "../Establishment/ListEtablishments/ListEstablishment.jsx";
import ScrollToTopButton from "../SharedComponents/ScrollToTopButton/ScrollToTopButton.jsx";
import Agrements from "./Agrements/Agrements";
import Direccte from "./Direccte";
import RelationsEntreprise from "./EnterpriseRelationship";
import Header from "./Header";
import Helps from "./Helps";
import Infos from "./Infos";
import Muteco from "./Muteco";

const Enterprise = ({ enterprise }) => {
  const location = useLocation();
  useScrollToLocationHash({ location });

  return (
    <div>
      <Header enterprise={enterprise} />
      <div className="data-sheet__main-container">
        <Infos enterprise={enterprise} />
        <Direccte entreprise={enterprise} />
        <RelationsEntreprise enterprise={enterprise} />
        <Muteco enterprise={enterprise} />
        <Helps enterprise={enterprise} />
        <Agrements enterprise={enterprise} />
        <ListEstablishment isEstablishmentDisplayed={true} />
      </div>
      <UsersFeedback fullWidth />
      <ScrollToTopButton />
    </div>

    // <Unsubscribe />
  );
};

Enterprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default React.memo(withLoading(Enterprise));
