import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { isIE } from "../../helpers/BrowserDetection";
import Config from "../../services/Config";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs.jsx";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  hasLandingHeader = false,
  hasSharedButton = false,
  children,
  displayMessage = false,
}) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");

  return (
    <>
      {hasLandingHeader ? (
        <Header hasSharedButton={hasSharedButton} />
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
};

export default Layout;
