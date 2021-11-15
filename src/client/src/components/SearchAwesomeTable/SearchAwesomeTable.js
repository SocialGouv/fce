import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/pro-duotone-svg-icons";
import classNames from "classnames";
import Button from "../shared/Button";
import LoadSpinner from "../shared/LoadSpinner";
import Pager from "./Pager";

import "./awesomeTable.scss";

const getSortIcon = (field, sortField, sortDirection) => {
  if (field === sortField) {
    return sortDirection === "asc" ? faSortDown : faSortUp;
  }
  return faSort;
};

const SearchAwesomeTable = ({
  showPagination = false,
  pagination,
  prevText = "Previous",
  nextText = "Next",
  isLoading = false,
  data,
  fields,
  history,
  isSortable = false,
  sortColumn,
  sortField,
  sortDirection
}) => (
  <table className="table at">
    <thead className="at__head">
      <tr className="at__head__tr">
        {fields.map(field => {
          const isSortableField = isSortable && field.sortKey;

          return (
            <th
              key={field.headName}
              className={classNames({
                at__head__th: true,
                "at__head__th--important": field.importantHead,
                "at__head__th--is-sortable": isSortableField
              })}
              onClick={() => isSortableField && sortColumn(field.sortKey)}
            >
              {field.headName}
              {isSortableField && (
                <FontAwesomeIcon
                  icon={getSortIcon(field.sortKey, sortField, sortDirection)}
                />
              )}
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
                  "table-cell--nowrap": index === 0
                })}
              >
                {field.html ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: field.accessor(element)
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
              <Button
                value={prevText}
                icon={faAngleLeft}
                iconClasses={["fa-2x"]}
                buttonClasses={["prev-button"]}
                isDisabled={pagination.current === pagination.min}
                callback={() => {
                  pagination.handlePageChange(--pagination.current);
                }}
              />
              <Pager
                handlePageChange={pagination.handlePageChange}
                currentPage={pagination.current}
                max={pagination.pages}
              />
              <Button
                value={nextText}
                icon={faAngleRight}
                iconClasses={["fa-2x"]}
                rowReverse={true}
                buttonClasses={["next-button"]}
                isDisabled={pagination.current === pagination.pages}
                callback={() => {
                  pagination.handlePageChange(++pagination.current);
                }}
              />
            </div>
          </td>
        </tr>
      </tfoot>
    )}
  </table>
);

SearchAwesomeTable.propTypes = {
  showPagination: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  prevText: PropTypes.string,
  nextText: PropTypes.string,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  selectedPage: PropTypes.func,
  history: PropTypes.object.isRequired,
  isSortable: PropTypes.bool,
  sortColumn: PropTypes.func,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string
};

export default withRouter(SearchAwesomeTable);
