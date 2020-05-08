import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IBrand, IModel, IYear, IValue } from "src/app/interfaces/interfaces";
import { Router } from "@angular/router";
import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { ClientService } from "src/app/services/client.service";

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
  visibleLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
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
  }

  onSubmit() {
    this.visibleLoading = true;

    this.clientService.createClient(this.assembleClient()).subscribe(
      (client) => this.sendPhoto(client._id),
      () => this.showMessageError()
    );
  }

  sendPhoto(id) {
    const photo = new FormData();

    if (this.selectFile) {
      Object.defineProperty(this.selectFile, "image", {
        writable: true,
        value: id + ".png",
      });

      photo.append("image", this.selectFile, this.selectFile.name);

      this.clientService.sendImage(photo, id).subscribe(
        () => {
          this.toast.emitToastSuccess("Foto cadastra com sucesso.");
          this.router.navigate(["/"]);
          this.visibleLoading = false;
        },
        () => {
          this.visibleLoading = false;
        }
      );
      return;
    }
    this.visibleLoading = false;
    this.toast.emitToastSuccess("Cliente cadastrado com sucesso.");
    this.router.navigate(["/"]);
  }

  assembleClient() {
    const form = this.registerForm.value;
    this.selectFile = form.photo;

    const address = {
      cep: form.cep,
      publicPlace: form.publicPlace,
      num: form.num,
      neighborhood: form.neighborhood,
    };

    const vehicle = {
      type: form.vehicle,
      brand: form.brand,
      model: form.model,
      year: form.year,
      value: form.value.value,
      yearModel: form.value.yearModel,
      fuel: form.value.yearMfuelodel,
      codeFipe: form.value.codeFipe,
      referenceMonth: form.value.referenceMonth,
      vehicleType: form.value.vehicleType,
      fuelAbbreviation: form.value.fuelAbbreviation,
    };

    const client = {
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      birth_date: form.birth,
      address,
      vehicle,
    };
    return client;
  }

  showMessageError() {
    this.toast.emitToastError(
      "Ocorreu um erro, por favor tente mais tarde.",
      "Erro"
    );
  }
}
