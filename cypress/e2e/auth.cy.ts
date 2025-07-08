describe("Auth flow - social login only", () => {
  it("Should show user as logged in after setting tokens", () => {
    cy.visit("/login");

    cy.window().then((win) => {
      win.localStorage.setItem("accessToken", "mockAccessToken");
      win.localStorage.setItem("refreshToken", "mockRefreshToken");
    });

    cy.visit("/");

    cy.window().should((win) => {
      expect(win.localStorage.getItem("accessToken")).to.eq("mockAccessToken");
    });

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
