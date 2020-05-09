import { SellerRegistrationPage } from "./seller-registration.po";

describe("Seller registration test", () => {
  let page: SellerRegistrationPage;

  beforeEach(() => {
    page = new SellerRegistrationPage();
    page.navigateTo();
  });

  it("Register form should be valid", () => {
    page.getNameTextbox().sendKeys("maria nazare");
    page.getEmailTextbox().sendKeys("maria@gmail.com");
    page.getPasswordTextbox().sendKeys("maria");

    let form = page.getForm().getAttribute("class");

    expect(form).toContain("ng-valid");
  });

  it("Register form should be invalid", () => {
    page.getNameTextbox().sendKeys("");
    page.getEmailTextbox().sendKeys("");
    page.getPasswordTextbox().sendKeys("");

    let form = page.getForm().getAttribute("class");

    expect(form).toContain("ng-invalid");
  });
});
