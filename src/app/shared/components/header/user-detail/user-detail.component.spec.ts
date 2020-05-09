import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { UserDetailComponent } from "./user-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/authentication.service";

class MockedAuthService {
  isLoggedIn() {
    return true;
  }

  logout() {
    return false;
  }
}

describe("UserDetailComponent", () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [UserDetailComponent],
      providers: [
        Toast,
        { provide: AuthenticationService, useClass: MockedAuthService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("Should be have a button to add customer", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("button")).nativeElement;

      expect(de.innerText).toContain("Cadastrar cliente");
    });

    it("should be have a button about", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("li:nth-child(2n) button"))
        .nativeElement;

      expect(de.innerText).toContain("Sobre");
    });

    it("should be have a button logout", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("li:nth-child(3n) button"))
        .nativeElement;

      expect(de.innerText).toContain("Sair");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be have selector `button`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("button"));

      expect(el).toBeTruthy();
    });
  });
});
