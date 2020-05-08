import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { HomeComponent } from "./home.component";
import IClient from "src/app/interfaces/Client";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [HomeComponent],
      providers: [Toast],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    let address = {
      cep: "string",
      publicPlace: "string",
      num: "string",
      neighborhood: "string",
    };

    let vehicle = {
      value: "R$ 3.820,00",
      brand: "ADLY",
      model: "ATV 100",
      type: "Motos",
      image: "",
      yearModel: 0,
      fuel: "string",
      codeFipe: "string",
      referenceMonth: "string",
      vehicleType: 0,
      fuelAbbreviation: "string",
      year: "string",
    };

    let clients: IClient[] = [
      {
        name: "Maria",
        cpf: "10876280408",
        phone: "string",
        birth_date: "string",
        address,
        vehicle,
      },
    ];

    component.clients = clients;
  }));

  it("should create", () => {
    expect(component).toBeDefined();
  });

  describe("Checks content displayed in HTML", () => {
    it("should be have a name", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td")).nativeElement;

      expect(de.innerText).toContain("Maria");
    });

    it("should be have a CPF", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(2n)"))
        .nativeElement;

      expect(de.innerText).toContain("10876280408");
    });

    it("should be have a vehicle", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(3n)"))
        .nativeElement;

      expect(de.innerText).toContain("Motos");
    });

    it("should be have a vehicle", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(3n)"))
        .nativeElement;

      expect(de.innerText).toContain("Motos");
    });

    it("should be have a brand", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(4n)"))
        .nativeElement;

      expect(de.innerText).toContain("ADLY");
    });

    it("should be have a model", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(5n)"))
        .nativeElement;

      expect(de.innerText).toContain("ATV 100");
    });

    it("should be have a value", () => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css("td:nth-child(6n)"))
        .nativeElement;

      expect(de.innerText).toContain("R$ 3.820,00");
    });
  });

  describe("Checks the CSS", () => {
    it("Should be class `spinner`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".spinner"));

      expect(el).toBeTruthy();
    });

    it("Should be class `container`", () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css(".container"));

      expect(el).toBeTruthy();
    });
  });
});
