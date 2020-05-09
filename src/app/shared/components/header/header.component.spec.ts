import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a link for home", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("a")).nativeElement;

      expect(de.innerText).toContain("CarShop");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be css `collapse`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".collapse"));

      expect(el).toBeTruthy();
    });

    it("Should  have selector `nav`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("nav"));

      expect(el).toBeTruthy();
    });

    it("Should be have selector `a`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("nav a"));

      expect(el).toBeTruthy();
    });
  });
});
