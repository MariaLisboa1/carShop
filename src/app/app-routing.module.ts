import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./core/components/register/register.component";
import { HomeComponent } from "./core/components/home/home.component";
import { EditClientComponent } from "./core/components/edit-client/edit-client.component";
import { SellerRegistrationComponent } from "./core/components/seller-registration/seller-registration.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "edit-client", component: EditClientComponent },
  { path: "sellerRegister", component: SellerRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
