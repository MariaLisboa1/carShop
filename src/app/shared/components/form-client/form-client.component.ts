import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IBrand, IModel, IYear, IValue } from "src/app/interfaces/interfaces";
import { VehiclesService } from "src/app/services/vehicles.service";

@Component({
  selector: "app-form-client",
  templateUrl: "./form-client.component.html",
  styleUrls: ["./form-client.component.scss"],
})
export class FormClientComponent implements OnInit {
  @Input() formGroupDynamic: FormGroup;
  @Input() client;
  @Input() title;
  @Input() titleBtn;
  @Input() readonly;
  @Input() visibleLoading;
  @Input() visibleDelete;
  @Output() btnSubmit = new EventEmitter();
  @Output() deleteClient = new EventEmitter();

  vehicleSrc = "../../../../assets/images/vehicle.png";
  imageSrc: any;
  selectFile: File = null;

  vehicles = [
    { nome: "Carros", codigo: "carros" },
    { nome: "Motos", codigo: "motos" },
    { nome: "Caminhões", codigo: "caminhoes" },
  ];

  brands: IBrand[] = [];
  models: IModel[] = [];
  years: IYear[] = [];
  value: IValue;

  path: string;
  idBrand: number;
  idModel: number;
  year: string;

  constructor(private vehicleService: VehiclesService) {}

  ngOnInit() {
    this.inicializer();
    this.imageSrc = this.formGroupDynamic.value.photo;
  }

  onSubmit(client) {
    client["value"] = this.createValue();

    if (this.selectFile) {
      client["photo"] = this.selectFile;
    }
    this.btnSubmit.emit(client);
  }

  getVehicleBrands() {
    this.path = this.getSelect("vehicle")
      ? this.getSelect("vehicle")
      : this.client
      ? this.client.vehicle.type
      : "caminhoes";

    this.vehicleService.getVehicleBrands(this.path).subscribe(
      (brands) => (this.brands = brands),
      (err) => {
        console.log(err);
      }
    );
  }

  getModels() {
    this.idBrand =
      parseFloat(this.getSelect("brand")) ||
      (this.client ? this.client.vehicle.brand : 102);

    this.vehicleService.getModels(this.path, this.idBrand).subscribe(
      (models) => {
        this.models = models.modelos;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getYear() {
    this.idModel = parseFloat(this.getSelect("model"))
      ? parseFloat(this.getSelect("model"))
      : this.client
      ? this.client.vehicle.model
      : 5986;

    this.vehicleService
      .getYear(this.path, this.idBrand, this.idModel)
      .subscribe(
        (years) => {
          this.years = years;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getValue() {
    this.year = this.getSelect("year")
      ? this.getSelect("year")
      : this.client
      ? this.client.vehicle.year
      : "32000-3";

    this.vehicleService
      .getValue(this.path, this.idBrand, this.idModel, this.year)
      .subscribe(
        (value) => {
          this.value = value;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  createValue() {
    return {
      value: this.value.Valor,
      brand: this.value.Marca,
      model: this.value.Modelo,
      yearModel: this.value.AnoModelo,
      fuel: this.value.Combustivel,
      codeFipe: this.value.CodigoFipe,
      referenceMonth: this.value.MesReferencia,
      vehicleType: this.value.TipoVeiculo,
      fuelAbbreviation: this.value.SiglaCombustivel,
    };
  }

  getSelect(id: any) {
    const select = document.getElementById(id) as HTMLSelectElement;
    return select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].value.toLowerCase()
      : "";
  }

  readURL(event) {
    this.selectFile = <File>event.target.files[0];

    if (<File>event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  delClient() {
    this.visibleLoading = true;
    this.deleteClient.emit();
  }

  async inicializer() {
    await this.getVehicleBrands();
    await this.getModels();
    await this.getYear();
    await this.getValue();
  }
}
