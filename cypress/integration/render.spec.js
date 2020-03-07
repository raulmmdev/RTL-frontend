describe("test", () => {
  it("render", () => {
    cy.visit("/");
    cy.get("[data-cy=banner").should("have.class", "banner");
    cy.get(".container").should("have.class", "container");
    cy.get("[data-cy=container-episodes").should(
      "have.class",
      "container-episodes"
    );
    cy.get("[data-cy=container-episodes-list-season")
      .should("have.class", "container-episodes-list-season")
      .contains("View Episode");
  });
});
