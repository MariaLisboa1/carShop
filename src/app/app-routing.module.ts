import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./core/components/register/register.component";
import { HomeComponent } from "./core/components/home/home.component";
import { EditClientComponent } from "./core/components/edit-client/edit-client.component";
import { SellerRegistrationComponent } from "./core/components/seller-registration/seller-registration.component";
import { LoginComponent } from "./security/login/login.component";
import { LoggedInGuard } from "./security/loggedin.guard";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [LoggedInGuard] },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: "edit-client",
    component: EditClientComponent,
    canActivate: [LoggedInGuard],
  },
  { path: "sellerRegister", component: SellerRegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
