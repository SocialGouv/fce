describe("Login to app", function() {
  it("First visite redirect to login page", function() {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });
  it("Login page contain valid form", function() {
    cy.get("#password").should("be.visible");
    cy.get("button").should("be.visible");
  });
  it("Bad password display error message", function() {
    cy.get("#password").type("bad password");
    cy
      .get(".login-form")
      .submit()
      .should("contain", "Connexion refusée");
  });
  it("Good password redirect to home page", function() {
    cy
      .get("#password")
      .clear()
      .type("D1r€cct€");
    cy.get(".login-form").submit();
    cy.location("pathname").should("eq", "/");
  });
  it("Can log out", function() {
    cy
      .get(".btn")
      .contains("Se déconnecter")
      .should("be.visible")
      .click();

    cy.location("pathname").should("eq", "/login");

    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });
});
