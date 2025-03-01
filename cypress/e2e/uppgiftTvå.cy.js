describe("Kontrollerar att den körs på port 5501", () => {
	it("Verifierar att sidan laddas utan fel", () => {
		cy.visit("/");
	});
});
describe("H1 test", () => {
	it("Kontrollerar att h1 med rätt text finns", () => {
		cy.visit("/");
		cy.get("h1", { timeout: 10000 })
			.should("be.visible")
			.and("contain", "Hacker Escape Rooms");
	});
});
