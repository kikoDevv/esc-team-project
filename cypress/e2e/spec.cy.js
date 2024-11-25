describe("Check index.html challenge buttons and book a room from challenges.html", () => {
  it("Enters index.html and checks that there are 3 challenge buttons with correct text", () => {
    cy.intercept(
      "GET",
      "https://lernia-sjj-assignments.vercel.app/api/challenges"
    ).as("fetchChallenges");

    cy.visit("index.html");

    cy.wait("@fetchChallenges");

    cy.get(".card-container__button")
      .should("have.length", 3)
      .each(($button) => {
        const correctButtonTexts = ["Take challenge online", "Book this room"];
        cy.wrap($button)
          .invoke("text")
          .then((text) => {
            expect(correctButtonTexts).to.include(text.trim());
          });
      });
  });

  it("Enter challenges.html through button and book a room", () => {
    cy.visit("index.html");

    cy.get("button")
      .contains("On-site challenges")
      .should("be.visible")
      .click();

    cy.get("button")
      .contains("Take challenge online")
      .should("be.visible")
      .click();

    cy.get(".date-input").click().type("2024-12-24");
    cy.get("#btn-search-time").click();
    cy.get("#input-name")
      .type("Robot test hehehaha")
      .should("have.value", "Robot test hehehaha");
    cy.get("#input-email")
      .type("emailWrittenByRobotHoho@robot.se")
      .should("have.value", "emailWrittenByRobotHoho@robot.se");
    cy.get(".submit-booking").click();
    cy.get("a").contains("Back to challenges").should("exist");
  });
});
