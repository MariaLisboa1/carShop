import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { InputComponent } from "./components/input/input.component";
import { FormClientComponent } from "./components/form-client/form-client.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgxMaskModule } from "ngx-mask";
import { UserDetailComponent } from "./components/header/user-detail/user-detail.component";
import { Error404Component } from "./components/error404/error404.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    InputComponent,
    FormClientComponent,
    UserDetailComponent,
    Error404Component,
    FooterComponent,
  ],
  exports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    InputComponent,
    FooterComponent,
    FormClientComponent,
  ],
  providers: [],
})
export class SharedModule {}
