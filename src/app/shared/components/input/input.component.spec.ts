import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { InputComponent } from "./input.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  let form: FormGroup;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [InputComponent],
      providers: [Toast, { provide: FormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    form = formBuilder.group({
      name: formBuilder.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    component.control = form.value;

    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks the CSS", () => {
    it("Should be class `form-group`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".form-group"));

      expect(el).toBeTruthy();
    });
  });
});
