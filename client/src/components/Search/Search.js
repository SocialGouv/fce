import React from "react";
import { Link } from "react-router-dom";
import "./search.css";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

class Search extends React.Component {
  render() {
    return (
      <div className="app-search">
        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <h1 className="title">Recherche</h1>
            <Form className="search-form" inline onSubmit={this.props.search}>
              <FormGroup className="col-md-9">
                <Input
                  type="text"
                  name="term"
                  id="term"
                  className="field"
                  required
                  placeholder="SIRET, SIREN, raison sociale"
                  onChange={evt => this.props.updateForm(evt)}
                />
              </FormGroup>

              <FormGroup className="col-md-3">
                <Button className="action" color="primary">
                  {this.props.loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Rechercher"
                  )}
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xl="6" md="8">
            <Link to="/search/advanced">Recherche avancée</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
