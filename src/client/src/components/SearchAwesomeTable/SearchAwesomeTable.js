import "./awesomeTable.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import LeftArrow from "../shared/Icons/LeftArrow.jsx";
import RightArrow from "../shared/Icons/RightArrow.jsx";
import LoadSpinner from "../shared/LoadSpinner";
import Pager from "./Pager";

const SearchAwesomeTable = ({
  showPagination = false,
  pagination,
  prevText = "Previous",
  nextText = "Next",
  isLoading = false,
  data,
  fields,
  history,
}) => (
  <table className="table at">
    <thead className="at__head">
      <tr className="at__head__tr">
        {fields.map((field) => {
          return (
            <th key={field.headName} className="at__head__th">
              {field.headName}
            </th>
          );
        })}
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
              <td
                key={index}
                className={classNames("at__body__td", {
                  "table-cell--nowrap": index === 0,
                })}
              >
                {field.html ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: field.accessor(element),
                    }}
                  />
                ) : (
                  field.accessor(element)
                )}
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
            <div className="pageNav">
              <button
                className="prev-btn"
                disabled={pagination.current === pagination.min}
                onClick={() =>
                  pagination.handlePageChange(--pagination.current)
                }
              >
                <LeftArrow />
                {prevText}
              </button>
              <Pager
                handlePageChange={pagination.handlePageChange}
                currentPage={pagination.current}
                max={pagination.pages}
              />

              <button
                className="prev-btn"
                disabled={pagination.current === pagination.pages}
                onClick={() =>
                  pagination.handlePageChange(++pagination.current)
                }
              >
                {nextText}
                <RightArrow />
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    )}
  </table>
);

SearchAwesomeTable.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  isSortable: PropTypes.bool,
  nextPage: PropTypes.func,
  nextText: PropTypes.string,
  pagination: PropTypes.object.isRequired,
  prevPage: PropTypes.func,
  prevText: PropTypes.string,
  selectedPage: PropTypes.func,
  showPagination: PropTypes.bool,
  sortColumn: PropTypes.func,
  sortDirection: PropTypes.string,
  sortField: PropTypes.string,
};

export default withRouter(SearchAwesomeTable);
