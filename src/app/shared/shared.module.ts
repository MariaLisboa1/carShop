import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { InputComponent } from "./components/input/input.component";

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [HeaderComponent, InputComponent],
  exports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    InputComponent,
  ],
  providers: [],
})
export class SharedModule {}
