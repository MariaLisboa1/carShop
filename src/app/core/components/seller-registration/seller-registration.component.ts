import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-seller-registration",
  templateUrl: "./seller-registration.component.html",
  styleUrls: ["./seller-registration.component.scss"],
})
export class SellerRegistrationComponent implements OnInit {
  sellerRegisterForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.sellerRegisterForm = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  onSubmit() {}
}
