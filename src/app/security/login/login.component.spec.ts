import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import IClient from "src/app/interfaces/Client";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a title", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h1")).nativeElement;

      expect(de.innerText).toContain("Login");
    });

    it("should be have a title button", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("button")).nativeElement;

      expect(de.innerText).toContain("Entrar");
    });

    it("should be have a title on tag A", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("a")).nativeElement;

      expect(de.innerText).toContain("Não tem um conta? Cadastre-se");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be class `container`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".container"));

      expect(el).toBeTruthy();
    });

    it("Should be class `input`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".input"));

      expect(el).toBeTruthy();
    });

    it("Should be class `no-have-account`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".no-have-account"));

      expect(el).toBeTruthy();
    });
  });
});
