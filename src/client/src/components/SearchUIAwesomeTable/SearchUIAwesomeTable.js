import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Button from "../shared/Button";
import LoadSpinner from "../shared/LoadSpinner";
import Pager from "./Pager";

import { faAngleLeft, faAngleRight } from "@fortawesome/fontawesome-pro-light";

import "./awesomeTable.scss";

const SearchUIAwesomeTable = ({
  showPagination,
  pagination,
  prevText,
  nextText,
  isLoading,
  data,
  fields,
  history
}) => {
  console.log("from SearchUIAwesomeTable.js", {
    showPagination,
    pagination,
    prevText,
    nextText,
    isLoading,
    data,
    fields,
    history
  });

  return (
    <table className="table at">
      <thead className="at__head">
        <tr className="at__head__tr">
          {fields.map(field => (
            <th
              key={field.headName}
              className={`${
                field.importantHead ? "at__head__important" : "at__head__th"
              }`}
            >
              {field.headName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="at__body">
        {isLoading ? (
          <tr>
            <td colSpan={fields.length}>
              <LoadSpinner />
            </td>
          </tr>
        ) : (
          data.map((element, index) => (
            <tr
              key={index}
              className="at__body__tr"
              onClick={() => history.push(`/establishment/${element.siret}`)}
            >
              {fields.map((field, index) => (
                <td key={index} className="at__body__td">
                  {field.accessor(element)}
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
                isDisabled={pagination.current === pagination.min}
                callback={() => {
                  pagination.setCurrent(--pagination.current);
                }}
              />
              <Pager
                setCurrent={pagination.setCurrent}
                currentPage={pagination.current}
                max={pagination.pages}
              />
              <Button
                value={nextText}
                icon={faAngleRight}
                iconClasses={["fa-2x"]}
                rowReverse={true}
                buttonClasses={["is-next-button", "is-pulled-right"]}
                isDisabled={pagination.current === pagination.pages}
                callback={() => {
                  pagination.setCurrent(++pagination.current);
                }}
              />
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

SearchUIAwesomeTable.defaultProps = {
  showPagination: false,
  isLoading: false,
  prevText: "Previous",
  nextText: "Next"
};

SearchUIAwesomeTable.propTypes = {
  showPagination: PropTypes.bool,
  page: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  prevText: PropTypes.string,
  nextText: PropTypes.string,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  selectedPage: PropTypes.func
};

export default withRouter(SearchUIAwesomeTable);
