import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      cpf: this.fb.control("", [Validators.required]),
      phone: this.fb.control("", [Validators.required]),
      birth: this.fb.control("", [Validators.required]),
      photo: this.fb.control(""),
      markModel: this.fb.control("", [Validators.required]),
      cep: this.fb.control("", [Validators.required]),
      publicPlace: this.fb.control("", [Validators.required]),
      num: this.fb.control("", [Validators.required]),
      neighborhood: this.fb.control("", [Validators.required]),
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
    console.log("Clicou em salvar");
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
