import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IBrand, IModel, IYear, IValue } from "src/app/interfaces/interfaces";
import { VehiclesService } from "src/app/services/vehicles.service";
import { Toast } from "../../helpers/toast/toast";

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

  constructor(private vehicleService: VehiclesService, private toast: Toast) {}

  ngOnInit() {
    this.inicializer();
    this.imageSrc = this.formGroupDynamic.value.photo;
  }

  onSubmit(client) {
    client["value"] = this.buildValue();

    if (this.selectFile) {
      client["photo"] = this.selectFile;
    }

    this.btnSubmit.emit(client);
  }

  getVehicleBrands() {
    const vehicle = this.getValueSelect("vehicle");
    if (vehicle) {
      this.path = vehicle;
    } else if (this.client) {
      this.path = this.client.vehicle.type;
    } else {
      this.path = "caminhoes";
    }

    this.vehicleService.getVehicleBrands(this.path).subscribe(
      (brands) => (this.brands = brands),
      () => this.toast.emitToastError()
    );
  }

  getModels() {
    this.idBrand =
      parseFloat(this.getValueSelect("brand")) ||
      (this.client ? this.client.vehicle.brand : 102);

    this.vehicleService.getModels(this.path, this.idBrand).subscribe(
      (models) => (this.models = models.modelos),
      () => this.toast.emitToastError()
    );
  }

  getYear() {
    const modelId = parseFloat(this.getValueSelect("model"));

    if (modelId) {
      this.idModel = modelId;
    } else if (this.client) {
      this.idModel = this.client.vehicle.model;
    } else {
      this.idModel = 5986;
    }

    this.vehicleService
      .getYear(this.path, this.idBrand, this.idModel)
      .subscribe(
        (years) => (this.years = years),
        () => this.toast.emitToastError()
      );
  }

  getValue() {
    const year = this.getValueSelect("year");
    if (year) {
      this.year = year;
    } else if (this.client) {
      this.year = this.client.vehicle.year;
    } else {
      this.year = "32000-3";
    }

    this.vehicleService
      .getValue(this.path, this.idBrand, this.idModel, this.year)
      .subscribe(
        (value) => (this.value = value),
        () => this.toast.emitToastError()
      );
  }

  buildValue() {
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

  getValueSelect(selector: any) {
    const select = document.getElementById(selector) as HTMLSelectElement;
    return select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].value.toLowerCase()
      : "";
  }

  readFile(event) {
    const file = <File>event.target.files;
    this.selectFile = file[0];

    if (file && file[0]) {
      const reader = new FileReader();

      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(this.selectFile);
    }
  }

  emitDeleteClient() {
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
