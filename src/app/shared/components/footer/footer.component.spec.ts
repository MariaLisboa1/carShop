import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FooterComponent],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a copyright", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css(".footer-copyright"))
        .nativeElement;

      expect(de.innerText).toContain("© 2020 Copyright:");
    });

    it("should be have a title site", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("a")).nativeElement;

      expect(de.innerText).toContain("CarShop.com");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be selector `footer`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("footer"));

      expect(el).toBeTruthy();
    });

    it("Should be selector `a`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("footer a"));

      expect(el).toBeTruthy();
    });
  });
});
