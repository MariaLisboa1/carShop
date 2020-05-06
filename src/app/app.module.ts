import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { Toast } from "./shared/helpers/Toast/toast";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],
  providers: [Toast, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
