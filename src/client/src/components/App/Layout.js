import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import LandingHeader from "../shared/LandingHeader";
import Config from "../../services/Config";
import { isIE } from "../../helpers/BrowserDetection";

export const Layout = ({
  hasLandingHeader = false,
  hasSharedButton = false,
  children
}) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");

  return (
    <>
      {hasLandingHeader ? (
        <LandingHeader hasSharedButton={hasSharedButton} />
      ) : (
        <Header showBetaMessage={!isActiveMaintenanceMode} />
      )}
      <div className={classNames("app-container", { ie11: isIE })}>
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  hasLandingHeader: PropTypes.bool,
  hasSharedButton: PropTypes.bool,
  children: PropTypes.node
};

export default Layout;
