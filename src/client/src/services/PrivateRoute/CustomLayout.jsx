import PropTypes from "prop-types";
import React from "react";

import { EstablishmentProvider } from "../../components/DataSheets/Sections/SharedComponents/EstablishmentContext.jsx";
import SubHeader from "../../components/DataSheets/Sections/SharedComponents/SubHeader/SubHeader.jsx";
import Sidebar from "../../components/DataSheets/Sidebar/Sidebar";

const CustomLayout = ({
  isEstablishmentDisplayed,
  isEntrepriseDisplayed,
  isEstablishmentsDisplayed,
  siren,
  siret,
  children,
}) => {
  return (
    <>
      <EstablishmentProvider siren={siren}>
        <div>
          <SubHeader siren={siren} />
          <section className="data-sheet container is-fluid">
            <div className="columns">
              <div className="column column-small-screen  aside-box">
                <Sidebar
                  siren={siren}
                  isEstablishmentDisplayed={isEstablishmentDisplayed}
                  isEntrepriseDisplayed={isEntrepriseDisplayed}
                  isEstablishmentsDisplayed={isEstablishmentsDisplayed}
                  siret={siret}
                />
              </div>
              <div className="data-sheet__main-content column is-10">
                {children}
              </div>
            </div>
          </section>
        </div>
      </EstablishmentProvider>
    </>
  );
};
CustomLayout.propTypes = {
  children: PropTypes.node,
  isEntrepriseDisplayed: PropTypes.bool.isRequired,
  isEstablishmentDisplayed: PropTypes.bool.isRequired,
  isEstablishmentsDisplayed: PropTypes.bool.isRequired,
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};
export default CustomLayout;
