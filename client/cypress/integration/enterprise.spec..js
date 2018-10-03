var openEnterprise = function(siren) {
  cy.get(".nav-link")
    .contains("Recherche simple")
    .click();

  cy.get("#term").type(siren);
  cy.get(".search-form").submit();
  cy.wait(5000);
};

var sections = [
  "identity",
  "activity",
  "headoffice",
  "finances",
  "attestations",
  "direccte",
  "mandataire"
];

describe("Enterprise", function() {
  it("Login to the app", function() {
    cy.visit("/");
    cy.get("#password")
      .clear()
      .type("D1r€cct€");
    cy.get(".login-form").submit();
    cy.location("pathname").should("eq", "/");
  });
  it("contain sections", function() {
    openEnterprise(487768616);
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
    openEnterprise(487768616);
    cy.get(".establishments-aside")
      .find("a")
      .contains("48776861600038")
      .click();
    cy.location("pathname").should("eq", "/establishment/48776861600038");
  });
});
