import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { isIE } from "../../helpers/BrowserDetection";
import Config from "../../services/Config";
import PortalClosureAlert from "../shared/PortalClosure/PortalClosureAlerte.jsx";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs.jsx";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  hasLandingHeader = false,
  hasSharedButton = false,
  children,
  displayMessage = false,
  isNotFound = false,
}) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");
  return (
    <>
      {!isNotFound && hasLandingHeader ? (
        <>
          <Header hasSharedButton={hasSharedButton} />
          <PortalClosureAlert />
        </>
      ) : (
        <>
          {" "}
          <Header
            showBetaMessage={!isActiveMaintenanceMode && displayMessage}
          />
          <Breadcrumbs />
        </>
      )}
      <div className={classNames("app-container", { ie11: isIE })}>
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  displayMessage: PropTypes.bool,
  hasLandingHeader: PropTypes.bool,
  hasSharedButton: PropTypes.bool,
  isNotFound: PropTypes.bool,
};

export default Layout;
