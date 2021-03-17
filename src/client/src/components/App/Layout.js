import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import LandingHeader from "../shared/LandingHeader";
import Config from "../../services/Config";
import { isIE } from "../../helpers/BrowserDetection";

export const Layout = ({
  withLandingHeader = false,
  withSharedButton = false,
  children
}) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");

  return (
    <>
      {withLandingHeader ? (
        <LandingHeader withSharedButton={withSharedButton} />
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
  withHeaderAndFooter: PropTypes.bool,
  withSharedButton: PropTypes.bool,
  children: PropTypes.node
};

export default Layout;
