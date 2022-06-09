import { format, parseISO } from "date-fns";
import fr from "date-fns/locale/fr";
import PropTypes from "prop-types";
import React from "react";

import SourceView from "../../components/Source";
import { useSources } from "./Source.gql";

const formatDate = (dateFormat) => (source) => {
  try {
    return format(parseISO(source?.date), dateFormat, { locale: fr });
  } catch (err) {
    return "";
  }
};

const formatSourceDate = formatDate("MMMM yyyy");

const formatTableCellDate = formatDate("dd/MM/yyyy");

const Source = ({
  si = null,
  isTableCell = false,
  sourceDate = null,
  sourceCustom = null,
}) => {
  const { data: sources } = useSources();
  const source = sources?.find?.(({ si: sourceSi }) => sourceSi === si);
  const name = sourceCustom || `${source?.fournisseur} / ${source?.si}`;
  const updated =
    sourceDate ||
    (isTableCell ? formatTableCellDate : formatSourceDate)(source);

  return (
    <SourceView
      name={name}
      updated={updated}
      isTableCell={isTableCell}
      isCustomSource={!!sourceCustom}
    />
  );
};

Source.propTypes = {
  isTableCell: PropTypes.bool,
  si: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
};

export default Source;
