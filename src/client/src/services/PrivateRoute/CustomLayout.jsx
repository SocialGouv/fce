import PropTypes from "prop-types";
import React from "react";

import { EstablishmentProvider } from "../../components/DataSheets/Sections/SharedComponents/EstablishmentContext.jsx";
import SubHeader from "../../components/DataSheets/Sections/SharedComponents/SubHeader/SubHeader.jsx";
import Sidebar from "../../components/DataSheets/Sidebar/Sidebar";
import UsersFeedback from "../../containers/UsersFeedback/UsersFeedback.js";

const CustomLayout = ({
  isEstablishmentDisplayed,
  isEntrepriseDisplayed,
  isEstablishmentsDisplayed,
  siren,
  siret,
  children,
}) => {
  const [isOpenUserFeedback, setIsOpenUserFeedback] = React.useState(false);

  const onOpenUserFeedback = (isOpen) => {
    setIsOpenUserFeedback(isOpen);
  };
  const openUserFeedback = () => {
    setIsOpenUserFeedback(true);
  };

  return (
    <>
      <EstablishmentProvider siren={siren}>
        <div>
          <SubHeader siren={siren} />
          <section className="data-sheet container is-fluid">
            <div className="columns">
              <div className="column column-small-screen aside-box">
                <Sidebar
                  siren={siren}
                  isEstablishmentDisplayed={isEstablishmentDisplayed}
                  isEntrepriseDisplayed={isEntrepriseDisplayed}
                  isEstablishmentsDisplayed={isEstablishmentsDisplayed}
                  siret={siret}
                  onOpenUserFeedbackBox={openUserFeedback}
                />
              </div>
              <div className="data-sheet__main-content column is-four-fifths is-full-mobile">
                {children}
                <UsersFeedback
                  fullWidth
                  isOpenUserFeedback={isOpenUserFeedback}
                  onOpenUserFeedback={onOpenUserFeedback}
                />
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
  siret: PropTypes.string,
};

export default CustomLayout;
