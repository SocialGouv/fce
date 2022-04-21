import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "graphiql/graphiql.min.css";
import GraphiQL from "graphiql";
import { useState } from "react";

const URL = "https://bce-integration-api.cegedim.cloud/v1/graphql";

const container = document.getElementById("root");
const root = createRoot(container);

const defaultQuery = `
# Vous devez définir les votre jeton d'identification dans le champ REQUEST HEADERS
# ci-dessous de la façon suivante
# {
#   "Authorization": "Bearer myToken"
# }
#
# Vous pouvez ensuite requêter l'API

{
  imp_StockUniteLegale(where: { siren: { _eq: "356000000" } }) {
    siren
    denominationUniteLegale
    denominationUsuelle1UniteLegale
  }
}
`;
const graphQLFetcher = (graphQLParams, { headers }) => {
  return fetch(URL, {
    method: "post",
    headers,
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json())
}

const App = () => {
  const [headers, setHeaders] = useState(localStorage.getItem("headers") || "");

  const onEditHeaders = (headers) => {
    localStorage.setItem("headers", headers);
    setHeaders(headers);
  }

  return (
      <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} headers={headers} onEditHeaders={onEditHeaders}/>
  )
}

root.render(
  <StrictMode>
  <App />
  </StrictMode>
);
