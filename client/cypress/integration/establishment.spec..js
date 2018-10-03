var openEstablishment = function(siret) {
  cy.get(".nav-link")
    .contains("Recherche simple")
    .click();

  cy.get("#term").type(siret);
  cy.get(".search-form").submit();
  cy.wait(5000);
};

var sections = [
  "identity-en",
  "identity-et",
  "activity",
  "predessucce",
  "relation",
  "development",
  "job",
  "mutations",
  "direccte"
];

describe("Establishment", function() {
  it("Login to the app", function() {
    cy.visit("/");
    cy.get("#password")
      .clear()
      .type("D1r€cct€");
    cy.get(".login-form").submit();
    cy.location("pathname").should("eq", "/");
  });
  it("contain sections", function() {
    openEstablishment(48776861600038);
    sections.forEach(function(id) {
      cy.get("#" + id).should("be.visible");
    });
  });
  it("contain quick access", function() {
    sections.forEach(function(id) {
      cy.get("a[href='#" + id + "']").should("be.visible");
    });
  });
  it("contain establishments", function() {
    cy.get(".establishments-aside")
      .contains("Établissement siège / principal")
      .should("be.visible");
    cy.get(".establishments-aside")
      .contains("Établissements en Occitanie")
      .should("be.visible");
  });
  it("can return to results list", function() {
    cy.get(".task-bar")
      .contains("Retour aux résultats")
      .should("be.visible")
      .click();
    cy.location("pathname").should("eq", "/search/results");
  });
  it("can open an establishment", function() {
    openEstablishment(48776861600038);
    cy.get(".establishments-aside")
      .find("a")
      .contains("48776861600012")
      .click();
    cy.location("pathname").should("eq", "/establishment/48776861600012");
  });
});
