describe("Booking test", () => {
  it("Enters the home page", () => {
    cy.visit("index.html");
    cy.get("button").contains("On-site challenges").click();
    cy.get("button").contains("Take challenge online").click();
    cy.get(".date-input").click().type("2024-12-24");
    cy.get("#btn-search-time").click();
    cy.get("#input-name").type("Robot!");
    cy.get("#input-email").type("1337@gmail.com");
    cy.get(".submit-booking").click();
  });
});
