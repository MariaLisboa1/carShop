import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SellerService } from "src/app/services/seller.service";
import { Toast } from "src/app/shared/helpers/toast/toast";

@Component({
  selector: "app-seller-registration",
  templateUrl: "./seller-registration.component.html",
  styleUrls: ["./seller-registration.component.scss"],
})
export class SellerRegistrationComponent implements OnInit {
  sellerRegisterForm: FormGroup;
  visibleLoading = false;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.sellerRegisterForm = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  onSubmit() {
    this.visibleLoading = true;
    const form = this.sellerRegisterForm.value;

    const seller = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    this.sellerService.createSeller(seller).subscribe(
      () => {
        this.visibleLoading = false;
        this.toast.emitToastSuccess("Vendedor cadastrado com sucesso.");
      },
      () => {
        this.visibleLoading = false;
        this.toast.emitToastError("Vendedor já cadastrado.", "Erro");
      }
    );
  }
}
