import React, {StrictMode, useMemo} from "react";
import { render } from "react-dom";
import "./styles.css";
import "graphiql/graphiql.min.css";
import GraphiQL from "graphiql";
import { useState } from "react";

const PROD_URL = "https://api.data.social.gouv.fr/v1/graphql";
const INTEG_URL = "https://bce-integration-api.cegedim.cloud/v1/graphql";

const container = document.getElementById("root");

const defaultQuery = `
# Vous devez définir les votre jeton d'identification dans le champ REQUEST HEADERS
# ci-dessous de la façon suivante
# {
#   "Authorization": "Bearer myToken"
# }
#
# Vous pouvez ensuite requêter l'API

{
  fce_entreprises(where: { siren: { _eq: "356000000" } }) {
    siren
    denominationunitelegale
    denominationusuelle1unitelegale
  }
}
`;
const graphQLFetcher = (url) => (graphQLParams, { headers }) => {
  return fetch(url, {
    method: "post",
    headers,
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json())
}

const App = () => {
  const [headers, setHeaders] = useState(localStorage.getItem("headers") || "");
  const [url, setUrl] = useState("https://api.data.social.gouv.fr/v1/graphql");


  const onEditHeaders = (headers) => {
    localStorage.setItem("headers", headers);
    setHeaders(headers);
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const fetcher = useMemo(() => graphQLFetcher(url), [url])

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div>
        <label>Environnement: </label>
        <select value={url} onChange={onUrlChange}>
          <option value={INTEG_URL}>integration</option>
          <option value={PROD_URL}>prod</option>
        </select>
      </div>
      <div style={{ flexGrow: 1 }}>
        <GraphiQL fetcher={fetcher} defaultQuery={defaultQuery} headers={headers} onEditHeaders={onEditHeaders}/>
      </div>
    </div>
  )
}

render(
  <StrictMode>
  <App />
  </StrictMode>,
  container
);
