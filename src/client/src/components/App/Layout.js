import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import Config from "../../services/Config";
import { isIE } from "../../helpers/BrowserDetection";

export const Layout = ({ withHeaderAndFooter = true, children }) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");

  return (
    <>
      {withHeaderAndFooter && (
        <Header showBetaMessage={!isActiveMaintenanceMode} />
      )}
      <div className={classNames("app-container", { ie11: isIE })}>
        {children}
      </div>
      {withHeaderAndFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  withHeaderAndFooter: PropTypes.bool,
  children: PropTypes.node
};

export default Layout;
