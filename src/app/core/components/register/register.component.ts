import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VehiclesService } from "src/app/services/vehicles.service";
import { IBrand, IModel, IYear, IValue } from "src/app/interfaces/interfaces";
import { Router } from "@angular/router";
import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  vehicleSrc = "../../../../assets/images/vehicle.png";

  imageSrc: any;
  selectFile: File = null;

  vehicles = [{ nome: "Carros" }, { nome: "Motos" }, { nome: "Caminhões" }];
  path: string;
  idBrand: number;
  idModel: number;
  year: string;

  brands: IBrand[] = [];
  models: IModel[] = [];
  years: IYear[] = [];
  value: IValue;

  hasRegistration = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private router: Router,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      cpf: this.fb.control({ value: null, disabled: false }, [
        Validators.required,
        GenericValidator.isValidCpf(),
      ]),
      phone: this.fb.control("", [Validators.required]),
      birth: this.fb.control({ value: null, disabled: false }, [
        Validators.required,
        GenericValidator.isValidDate(),
      ]),
      photo: this.fb.control(""),
      cep: this.fb.control("", [Validators.required]),
      publicPlace: this.fb.control("", [Validators.required]),
      num: this.fb.control("", [Validators.required]),
      neighborhood: this.fb.control("", [Validators.required]),
      vehicle: this.fb.control("caminhoes"),
      brand: this.fb.control("102"),
      model: this.fb.control("5986"),
      year: this.fb.control("32000-3"),
    });

    this.inicializer();
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

  getVehicleBrands() {
    this.path = this.getSelect("vehicle") || "caminhoes";

    this.vehicleService.getVehicleBrands(this.path).subscribe(
      (brands) => (this.brands = brands),
      (err) => {
        console.log(err);
      }
    );
  }

  getModels() {
    this.idBrand = parseFloat(this.getSelect("brand")) || 102;

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
    this.idModel = parseFloat(this.getSelect("model")) || 5986;

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
    this.year = this.getSelect("year") || "32000-3";

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

  onSubmit() {
    this.validateDate();
    const messageSuccess = "Cadastro realizado com sucesso.";
    this.registerForm.value["value"] = this.createValue();

    let registrations = JSON.parse(localStorage.getItem("register"));
    if (registrations) {
      const findCpf = registrations.find(
        (register) => register.cpf === this.registerForm.value.cpf
      );

      if (findCpf) {
        this.toast.emitToastError("Já existe cadastro para esse CPF.", "Erro");
        return;
      }

      const registrationsStorage = [...registrations, this.registerForm.value];

      localStorage.setItem("register", JSON.stringify(registrationsStorage));
      this.hasRegistration = false;
      this.toast.emitToastSuccess(messageSuccess);
      return;
    }

    localStorage.setItem("register", JSON.stringify([this.registerForm.value]));
    this.toast.emitToastSuccess(messageSuccess);
  }

  validateDate() {
    const date = this.registerForm.value.birth;
  }

  sendPhoto(id) {
    const photo = new FormData();

    if (this.selectFile) {
      Object.defineProperty(this.selectFile, "name", {
        writable: true,
        value: id.id + ".png",
      });

      //   photo.append("photo", this.selectFile, this.selectFile.name);

      //   this.registerService.sendPhoto(photo, id.id).subscribe(
      //     res => {
      //       this.toast.emitToastSuccess("Conta criada com sucesso.");
      //       this.route.navigate(["/login"]);
      //     },
      //     err => {
      //       console.log(err);
      //     }
      //   );
    }
  }

  getSelect(id: any) {
    const select = document.getElementById(id) as HTMLSelectElement;
    return select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].value.toLowerCase()
      : "";
  }

  inicializer() {
    this.getVehicleBrands();
    this.getModels();
    this.getYear();
    this.getValue();
  }
}
