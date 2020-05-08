import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { ClientService } from "src/app/services/client.service";
import { Builder } from "src/app/shared/helpers/builder/builder";

@Component({
  selector: "app-register-client",
  templateUrl: "./register-client.component.html",
  styleUrls: ["./register-client.component.scss"],
})
export class RegisterClientComponent implements OnInit {
  registerForm: FormGroup;
  vehicleSrc = "../../../../assets/images/vehicle.png";

  imageSrc: any;
  selectFile: File = null;
  visibleLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private toast: Toast,
    private builder: Builder
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
    this.selectFile = this.registerForm.value.photo;
    const client = this.builder.buildClient(this.registerForm.value);

    this.clientService.createClient(client).subscribe(
      (client) => this.sendPhoto(client._id),
      () => this.toast.emitToastError()
    );
  }

  sendPhoto(id) {
    const photo = new FormData();
    const file = this.selectFile;

    if (file) {
      Object.defineProperty(file, "image", {
        writable: true,
        value: id + ".png",
      });

      photo.append("image", file, file.name);

      this.clientService.sendImage(photo, id).subscribe(
        () => {
          this.toast.emitToastSuccess("Foto cadastra com sucesso.");
          this.router.navigate(["/home"]);
          this.visibleLoading = false;
        },
        () => {
          this.visibleLoading = false;
          this.toast.emitToastError();
        }
      );
      return;
    }
    this.visibleLoading = false;
    this.toast.emitToastSuccess("Cliente cadastrado com sucesso.");
    this.router.navigate(["/home"]);
  }
}
