import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { NgxMaskModule } from "ngx-mask";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent, AppRoutingModule, HttpClientModule],
  providers: [],
})
export class CoreModule {}
