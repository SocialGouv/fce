import { mapValues } from "lodash";
import { get } from "lodash/fp";


export const formatAppSearchResults = (appSearchResult) =>
    appSearchResult.rawResults.map(rawResult => mapValues(rawResult, get("raw")));

export const formatAppSearchPagination = ({ info: { meta: { page: {
    current, size, total_pages, total_results
} } } }) => ({
    current,
    size,
    pages: total_pages,
    items: total_results
});
