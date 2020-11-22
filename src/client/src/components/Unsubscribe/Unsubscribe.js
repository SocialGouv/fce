import React from "react";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import "react-toggle/style.css";
import "./unsubscribe.scss";

const Unsubscribe = ({ isSubscribed, handleChange, message, hasError }) => {
  console.log(isSubscribed);
  return (
    <section className="control mailing-list-subscription">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(
              "notification mailing-list-subscription__notification",
              {
                "is-success": !hasError,
                "is-danger": hasError
              }
            )}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mailing-list-subscription__switch">
        <label htmlFor="mailing-list-subscription-toggle">
          Je souhaite recevoir des informations par email
        </label>
        <Toggle
          id="mailing-list-subscription-toggle"
          checked={isSubscribed}
          name="burritoIsReady"
          value="yes"
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

Unsubscribe.propTypes = {
  isSubscribed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  message: PropTypes.string,
  hasError: PropTypes.bool.isRequired
};

export default Unsubscribe;
