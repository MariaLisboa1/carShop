import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { InputComponent } from "./components/input/input.component";
import { FormComponent } from "./components/form/form.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [HeaderComponent, InputComponent, FormComponent],
  exports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    InputComponent,
    FormComponent,
  ],
  providers: [],
})
export class SharedModule {}
