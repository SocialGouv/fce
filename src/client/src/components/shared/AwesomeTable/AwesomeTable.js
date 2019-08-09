import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Button from "../Button";
import LoadSpinner from "../LoadSpinner";
import Pager from "./Pager";

import { faAngleLeft, faAngleRight } from "@fortawesome/fontawesome-pro-light";

import "./awesomeTable.scss";

const AwesomeTable = ({
  showPagination,
  page,
  loading,
  data,
  fields,
  history,
  prevText,
  nextText,
  prevPage,
  nextPage,
  selectedPage
}) => {
  return (
    <table className="table at">
      <thead className="at__head">
        <tr className="at__head__tr">
          {fields.map(field => (
            <th key={field.headName} className="at__head__th">
              {field.headName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="at__body">
        {loading ? (
          <tr>
            <td colSpan={fields.length}>
              <LoadSpinner />
            </td>
          </tr>
        ) : (
          data.map((enterprise, index) => (
            <tr
              key={index}
              className="at__body__tr"
              onClick={() =>
                history.push(`/establishment/${enterprise.etablissement.siret}`)
              }
            >
              {fields.map((field, index) => (
                <td key={index} className="at__body__td">
                  {field.accessor(enterprise)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
      {showPagination && (
        <tfoot className="at__footer">
          <tr className="at__footer__tr">
            <td className="at__footer__td" colSpan={fields.length}>
              <Button
                value={prevText}
                icon={faAngleLeft}
                iconClasses={["fa-2x"]}
                buttonClasses={["is-prev-button", "is-pulled-left"]}
                isDisabled={page.currentPage === page.min}
                callback={prevPage}
              />
              <Pager
                selectedPage={page => selectedPage(page)}
                currentPage={page.currentPage}
                max={page.max}
              />
              <Button
                value={nextText}
                icon={faAngleRight}
                iconClasses={["fa-2x"]}
                rowReverse={true}
                buttonClasses={["is-next-button", "is-pulled-right"]}
                isDisabled={page.currentPage === page.max}
                callback={nextPage}
              />
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

AwesomeTable.defaultProps = {
  showPagination: false,
  loading: false,
  prevText: "Previous",
  nextText: "Next"
};

AwesomeTable.propTypes = {
  showPagination: PropTypes.bool,
  page: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  loading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  prevText: PropTypes.string,
  nextText: PropTypes.string,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  selectedPage: PropTypes.func
};

export default withRouter(AwesomeTable);
