import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import NotFound from "../../components/DataSheets/NotFound/NotFound.jsx";
import { EstablishmentProvider } from "../../components/DataSheets/Sections/SharedComponents/EstablishmentContext.jsx";
import SubHeader from "../../components/DataSheets/Sections/SharedComponents/SubHeader/SubHeader.jsx";
import Sidebar from "../../components/DataSheets/Sidebar/Sidebar";
import UsersFeedback from "../../containers/UsersFeedback/UsersFeedback.js";

const CustomLayout = ({
  isEstablishmentDisplayed = false,
  isEntrepriseDisplayed = false,
  isEstablishmentsDisplayed = false,
  siren,
  siret,
  children,
  isNotFound = false,
  loading = false,
}) => {
  const [isOpenUserFeedback, setIsOpenUserFeedback] = React.useState(false);
  const ref = useRef(null);

  const onOpenUserFeedback = (isOpen) => {
    setIsOpenUserFeedback(isOpen);
  };
  const openUserFeedback = () => {
    setIsOpenUserFeedback(true);
  };
  useEffect(() => {
    if (ref.current) {
      if (loading) {
        ref.current.continuousStart();
      } else {
        ref.current.complete();
      }
    }
  }, [loading, ref]);

  if (isNotFound) return <NotFound />;

  return (
    <>
      <EstablishmentProvider siren={siren}>
        <div>
          <SubHeader siren={siren} />
          <LoadingBar color="#2980b9" ref={ref} />

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
        <Outlet />
      </EstablishmentProvider>
    </>
  );
};

CustomLayout.propTypes = {
  children: PropTypes.node,
  isEntrepriseDisplayed: PropTypes.bool,
  isEstablishmentDisplayed: PropTypes.bool,
  isEstablishmentsDisplayed: PropTypes.bool,
  isNotFound: PropTypes.bool,
  loading: PropTypes.bool,
  siren: PropTypes.string,
  siret: PropTypes.string,
};

export default CustomLayout;
