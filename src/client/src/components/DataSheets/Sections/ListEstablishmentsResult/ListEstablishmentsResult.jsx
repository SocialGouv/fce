import "./ListEstablishmentsResult.scss";

import PropTypes from "prop-types";
import React from "react";

import Sidebar from "../../Sidebar/Sidebar";
import { EstablishmentProvider } from "../SharedComponents/EstablishmentContext.jsx";
import SubHeader from "../SharedComponents/SubHeader/SubHeader.jsx";
import { Establishments } from "./Establishments.jsx";

const ListEstablishmentsResult = ({ siren }) => {
  return (
    <EstablishmentProvider siren={siren}>
      <div>
        <SubHeader siren={siren} />

        <section className="sheet container is-fluid">
          <div className="columns">
            <div className="column  aside-box ">
              <Sidebar siren={siren} isEstablishmentsDisplayed />
            </div>

            <div className="sheet__main-content column is-10">
              <div className="sheet__main-container">
                <Establishments />
              </div>
            </div>
          </div>
        </section>
      </div>
    </EstablishmentProvider>
  );
};

ListEstablishmentsResult.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default ListEstablishmentsResult;
