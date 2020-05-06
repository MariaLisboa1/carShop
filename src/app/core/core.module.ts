import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { NgxMaskModule } from "ngx-mask";
import { RegisterComponent } from "./components/register/register.component";
import { VehiclesService } from "../services/vehicles.service";

import { LOCALE_ID } from "@angular/core";
import ptBr from "@angular/common/locales/pt";
import { HomeComponent } from "./components/home/home.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
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
  declarations: [RegisterComponent, HomeComponent, EditClientComponent],
  exports: [RegisterComponent, AppRoutingModule, HttpClientModule],
  providers: [VehiclesService, { provide: LOCALE_ID, useValue: "pt-PT" }],
})
export class CoreModule {}
