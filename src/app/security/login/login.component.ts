import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  visibleLoading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  onSubmit() {
    this.visibleLoading = true;
    const form = this.loginForm.value;

    const seller = {
      email: form.email,
      password: form.password,
    };

    this.loginService.login(seller).subscribe(
      (seller) => {
        this.visibleLoading = false;
        localStorage.setItem("token", seller.token);
        this.router.navigate(["/home"]);
      },
      () => {
        this.visibleLoading = false;
        this.toast.emitToastError(
          "Ocorreu um erro. Por favor tente mais tarde.",
          "Erro"
        );
      }
    );
  }
}
