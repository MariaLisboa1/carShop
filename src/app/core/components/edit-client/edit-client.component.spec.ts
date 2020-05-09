import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { EditClientComponent } from "./edit-client.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Builder } from "src/app/shared/helpers/builder/builder";

describe("EditClientComponent", () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [EditClientComponent],
      providers: [Toast, Builder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;

    component.loadingForm = true;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks the CSS", () => {
    it("Should be class `spinner`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".spinner"));

      expect(el).toBeTruthy();
    });
  });
});
