import "./awesomeTable.scss";

import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import PaginationTable from "../DataSheets/Sections/SharedComponents/PaginationTable/PaginationTable.jsx";
import LeftArrow from "../shared/Icons/LeftArrow.jsx";
import RightArrow from "../shared/Icons/RightArrow.jsx";
import LoadSpinner from "../shared/LoadSpinner";

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
  // isSortable = true,
  sortColumn,
  sortField,
  sortDirection,
}) => {
  const handleRowClick = (event, element) => {
    if (event.target.tagName === "A") {
      return;
    }
    window.location.href = `/establishment/${element.siret}`;
  };
  return (
    <table className="table at">
      <thead className="at__head">
        <tr className="at__head__tr">
          {fields.map((field) => {
            const isSortableField = field.sortKey;
            return (
              <th
                key={field.headName}
                className={classNames({
                  at__head__th: true,
                  "at__head__th--important": field.importantHead,
                  "at__head__th--is-sortable": !!isSortableField,
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
              onClick={(e) => handleRowClick(e, element)}
            >
              {fields.map((field, key) => {
                return (
                  <td
                    key={`${key}-${element?.siret}`}
                    className={classNames("at__body__td", {
                      "table-cell--nowrap": key === 0,
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
                );
              })}
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
                <PaginationTable
                  handlePageClick={pagination.handlePageChange}
                  currentPage={pagination.current}
                  totalPages={pagination.pages}
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
};

SearchAwesomeTable.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default SearchAwesomeTable;
