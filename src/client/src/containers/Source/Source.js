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

const formatDateUniteControle = (source) => {
  try {
    return format(parseISO(source?.date_import), "MMMM yyyy", { locale: fr });
  } catch (err) {
    return "";
  }
};

const formatSourceDate = formatDate("MMMM yyyy");

const formatTableCellDate = formatDate("dd/MM/yyyy");

const Source = ({
  si = null,
  hasDateImport = false,
  isTableCell = false,
  sourceDate = null,
  sourceCustom = null,
}) => {
  const { data: sources } = useSources();
  const source = sources?.find?.(
    ({ si: sourceSi, table }) => sourceSi === si || si === table
  );
  const name = sourceCustom || `${source?.fournisseur} / ${source?.si}`;
  const uniteControleUpdated = formatDateUniteControle(source);
  const updated =
    sourceDate ||
    (isTableCell ? formatTableCellDate : formatSourceDate)(source);

  return (
    <SourceView
      name={name}
      updated={hasDateImport ? uniteControleUpdated : updated}
      isTableCell={isTableCell}
      isCustomSource={hasDateImport ? !hasDateImport : !!sourceCustom}
    />
  );
};

Source.propTypes = {
  hasDateImport: PropTypes.bool,
  isTableCell: PropTypes.bool,
  si: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
};

export default Source;
