import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { FormClientComponent } from "./form-client.component";
import { CommonModule } from "@angular/common";

describe("FormClientComponent", () => {
  let component: FormClientComponent;
  let fixture: ComponentFixture<FormClientComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [FormClientComponent],
      providers: [Toast, { provide: FormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(FormClientComponent);
    component = fixture.componentInstance;

    component.formGroupDynamic = formBuilder.group({
      name: null,
      cpf: "108.762.804-08",
      phone: null,
      birth: null,
      photo: null,
      cep: null,
      publicPlace: null,
      num: null,
      neighborhood: null,
      vehicle: null,
      brand: null,
      model: null,
      year: null,
    });

    component.vehicles = [
      { nome: "Carros", codigo: "carros" },
      { nome: "Motos", codigo: "motos" },
      { nome: "Caminhões", codigo: "caminhoes" },
    ];

    component.titleBtn = "Editar";
    component.visibleDelete = true;

    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a title", () => {
      component.title = "Titulo";
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h2")).nativeElement;

      expect(de.innerText).toContain("Titulo");
    });

    it("should be have a h5", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("h5")).nativeElement;

      expect(de.innerText).toContain("Informações Pessoais");
    });

    it("should be have a title address", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css(".endereco")).nativeElement;

      expect(de.innerText).toContain("Endereço");
    });

    it("should be have a title vehicle", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css(".float-right h5"))
        .nativeElement;

      expect(de.innerText).toContain("Automóvel");
    });

    it("should be have a label", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("label")).nativeElement;

      expect(de.innerText).toContain("Selecionar um arquivo");
    });

    it("should be have selected vehicle", () => {
      fixture.detectChanges();
      const select: HTMLSelectElement = fixture.debugElement.query(
        By.css("#vehicle")
      ).nativeElement;
      select.value = select.options[1].value;
      select.dispatchEvent(new Event("change"));
      select.click();

      expect(select.innerText).toContain("Motos");
    });

    it("should be have title button", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("button")).nativeElement;

      expect(de.innerText).toContain("Editar");
    });

    it("should be have title in btn-danger", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css(".btn-danger")).nativeElement;

      expect(de.innerText).toContain("Excluir");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be class `container`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".container"));

      expect(el).toBeTruthy();
    });

    it("Should be class `form`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".form"));

      expect(el).toBeTruthy();
    });

    it("Should be class `input`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("input"));

      expect(el).toBeTruthy();
    });

    it("Should be class `clearFix`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".clearFix"));

      expect(el).toBeTruthy();
    });

    it("Should be class `h5`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("h5"));

      expect(el).toBeTruthy();
    });

    it("Should be class `button.btn.btn_primary`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("button.btn.btn_primary"));

      expect(el).toBeTruthy();
    });

    it("Should be class `input-wrapper label`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".input-wrapper label"));

      expect(el).toBeTruthy();
    });

    it("Should be selector `select`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css("select"));

      expect(el).toBeTruthy();
    });

    it("Should be class `value`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".value"));

      expect(el).toBeTruthy();
    });

    it("Should be class `img-thumbnail`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".img-thumbnail"));

      expect(el).toBeTruthy();
    });
  });
});
