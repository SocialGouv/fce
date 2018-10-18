var search = function(term) {
  cy.get(".nav-link")
    .contains("Recherche simple")
    .click();

  cy.get("#term").type(term);
  cy.get(".search-form").submit();
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
  it("have search form", function() {
    cy.get("#term").should("be.visible");
    cy.get("button")
      .contains("Rechercher")
      .should("be.visible");
  });
  it("search with empty résult", function() {
    cy.get("#term").type("this enterprise doesn't exist");
    cy.get(".search-form").submit();

    cy.location("pathname").should("eq", "/search/results");
    cy.get(".alert-info")
      .should("be.visible")
      .should("contain", "Aucun résultat");
  });
  it("return to search page when click to menu", function() {
    cy.get(".nav-link")
      .contains("Recherche simple")
      .click();
    cy.location("pathname").should("eq", "/search");
  });
  it("search with many results", function() {
    cy.get("#term").type("occitech");
    cy.get(".search-form").submit();

    cy.location("pathname").should("eq", "/search/results");

    cy.get(".ReactTable")
      .should("be.visible")
      .find(".rt-tbody > .rt-tr-group")
      .its("length")
      .should("be.gte", 1);
  });
  it("click on siret open establishment", function() {
    cy.get(".ReactTable")
      .find("a")
      .contains("48776861600038")
      .click();
    cy.location("pathname").should("eq", "/establishment/48776861600038");
  });
  it("click on siren open enterprise", function() {
    search("occitech");

    cy.get(".ReactTable")
      .find("a")
      .eq(1)
      .click();
    cy.location("pathname").should("eq", "/enterprise/487768616");
  });
  it("search by siret open establishment", function() {
    search("48776861600038");
    cy.wait(5000);
    cy.location("pathname").should("eq", "/establishment/48776861600038");
  });
  it("search by siren open enterprise", function() {
    search("487768616");
    cy.wait(5000);
    cy.location("pathname").should("eq", "/enterprise/487768616");
  });
  it("if has 1 result, redirect to establishment", function() {
    search("simtie");
    cy.wait(5000);
    cy.location("pathname").should("eq", "/establishment/79418530600014");
  });
});
