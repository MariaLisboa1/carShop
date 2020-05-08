import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { NgxMaskModule } from "ngx-mask";
import { VehiclesService } from "../services/vehicles.service";

import { LOCALE_ID } from "@angular/core";
import ptBr from "@angular/common/locales/pt";
import { HomeComponent } from "./components/home/home.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { SellerRegistrationComponent } from "./components/seller-registration/seller-registration.component";
import { LoginComponent } from "../security/login/login.component";
import { RegisterClientComponent } from "./components/register-client/register-client.component";
registerLocaleData(ptBr);
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    RegisterClientComponent,
    HomeComponent,
    EditClientComponent,
    SellerRegistrationComponent,
    LoginComponent,
  ],
  exports: [RegisterClientComponent, AppRoutingModule, HttpClientModule],
  providers: [VehiclesService, { provide: LOCALE_ID, useValue: "pt-PT" }],
})
export class CoreModule {}
