import { LoginPage } from "./login.po";

describe("Login test", () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it("Login form should be valid", () => {
    page.getEmailTextbox().sendKeys("maria@gmail.com");
    page.getPasswordTextbox().sendKeys("maria");

    let form = page.getForm().getAttribute("class");

    expect(form).toContain("ng-valid");
  });

  it("Login form should be invalid", () => {
    page.getEmailTextbox().sendKeys("");
    page.getPasswordTextbox().sendKeys("");

    let form = page.getForm().getAttribute("class");

    expect(form).toContain("ng-invalid");
  });
});
