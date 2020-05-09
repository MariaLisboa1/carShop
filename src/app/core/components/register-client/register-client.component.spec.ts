import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Builder } from "src/app/shared/helpers/builder/builder";
import { RegisterClientComponent } from "./register-client.component";

describe("RegisterClientComponent", () => {
  let component: RegisterClientComponent;
  let fixture: ComponentFixture<RegisterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [RegisterClientComponent],
      providers: [Toast, Builder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterClientComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });
});
