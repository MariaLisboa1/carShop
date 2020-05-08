import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SellerRegistrationComponent } from "./seller-registration.component";

describe("SellerRegistrationComponent", () => {
  let component: SellerRegistrationComponent;
  let fixture: ComponentFixture<SellerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [SellerRegistrationComponent],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(SellerRegistrationComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a title", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h1")).nativeElement;

      expect(de.innerText).toContain("Cadastro de Vendedor");
    });

    it("should be have a title button", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("button")).nativeElement;

      expect(de.innerText).toContain("Cadastrar");
    });

    it("should be have a title on tag A", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("a")).nativeElement;

      expect(de.innerText).toContain("Já tem uma conta? Faça login");
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

    it("Should be class `have-account`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".have-account"));

      expect(el).toBeTruthy();
    });
  });
});
