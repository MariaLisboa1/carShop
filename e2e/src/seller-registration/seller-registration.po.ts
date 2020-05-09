import { browser, by, element } from "protractor";

export class SellerRegistrationPage {
  navigateTo() {
    return browser.get("/sellerRegister");
  }

  getNameTextbox() {
    return element(by.name("name"));
  }

  getEmailTextbox() {
    return element(by.name("email"));
  }

  getPasswordTextbox() {
    return element(by.name("password"));
  }

  getForm() {
    return element(by.css("#register"));
  }

  getSubmitButton() {
    return element(by.css("#btnSubmit"));
  }
}
