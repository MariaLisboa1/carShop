import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { Toast } from "./shared/helpers/toast/toast";
import { AuthenticationService } from "./services/authentication.service";
import { LoggedInGuard } from "./security/loggedin.guard";
import { Builder } from "./shared/helpers/builder/builder";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],
  providers: [Toast, Builder, AuthenticationService, LoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
