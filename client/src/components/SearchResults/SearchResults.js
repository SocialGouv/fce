import React from "react";
import "./searchResults.css";
import { Row, Col } from "reactstrap";
import Terms from "./Terms";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="app-searchResults">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Résultats de recherche</h1>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <Terms terms={this.props.terms} />
          </Col>
        </Row>

        <p>Page des résultats</p>
      </div>
    );
  }
}

export default SearchResults;
