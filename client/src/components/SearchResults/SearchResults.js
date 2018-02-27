import React from "react";
import "./searchResults.css";
import { Row, Col, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-light";
import Terms from "./Terms";
import Item from "./Item";

class SearchResults extends React.Component {
  render() {
    let items = this.props.results.map((item, index) => (
      <Item item={item} key={index} />
    ));

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

        <Row className="justify-content-md-center d-print-none">
          <Col xl="6" md="12" className="text-center">
            <Button color="primary" onClick={() => window.print()}>
              <FontAwesomeIcon icon={faPrint} /> Imprimer
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <ul className="result-list">{items}</ul>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchResults;
