var search = function(terms) {
  cy.get(".nav-link")
    .contains("Recherche avancée")
    .click();

  for (var fieldName in terms) {
    var term = terms[fieldName];
    var el = cy.get('input[name="' + fieldName + '"]');

    if (fieldName === "siegeSocial") {
      if (term) {
        el.check();
      }
    } else {
      el.type(term);
    }
  }

  cy.get(".advancedSearch-form").submit();
};

describe("Basic search", function() {
  it("Login to the app", function() {
    cy.visit(Cypress.env("host") + "/");
    cy.get("#password")
      .clear()
      .type("D1r€cct€");
    cy.get(".login-form").submit();
    cy.location("pathname").should("eq", "/");
  });
  it("Advanced page", function() {
    cy.get(".nav-link")
      .contains("Recherche avancée")
      .click();

    cy.location("pathname").should("eq", "/search/advanced");

    [
      "siren",
      "raisonSociale",
      "naf",
      "commune",
      "codePostal",
      "departement",
      "interactions",
      "siegeSocial"
    ].forEach(function(name) {
      cy.get('input[name="' + name + '"]').should("be.visible");
    });
    cy.get("button")
      .contains("Rechercher")
      .should("be.visible");
  });
  it("Search by name and filter by siegeSocial", function() {
    search({ raisonSociale: "occitech", siegeSocial: true });
    cy.location("pathname").should("eq", "/search/results");

    cy.get(".ReactTable")
      .should("be.visible")
      .find(".rt-tbody > .rt-tr-group")
      .its("length")
      .should("be.eq", 2);

    search({ raisonSociale: "occitech", siegeSocial: false });
    cy.get(".ReactTable")
      .should("be.visible")
      .find(".rt-tbody > .rt-tr-group")
      .its("length")
      .should("be.gte", 2);
  });
});
