import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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

  constructor(
    private fb: FormBuilder,
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

  onSubmit() {
    console.log(this.registerForm.value);
    return;
    const messageSuccess = "Cadastro realizado com sucesso.";

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
      this.toast.emitToastSuccess(messageSuccess);
      return;
    }

    localStorage.setItem("register", JSON.stringify([this.registerForm.value]));
    this.toast.emitToastSuccess(messageSuccess);

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 2000);
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
}
