import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Error404Component } from "./error404.component";

describe("Error404Component", () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Error404Component],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a title", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h1")).nativeElement;

      expect(de.innerText).toContain("Ops!");
    });

    it("should be have a h2", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h2")).nativeElement;

      expect(de.innerText).toContain("404 Página Não Encontrada");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be class `container`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".container"));

      expect(el).toBeTruthy();
    });
  });
});
