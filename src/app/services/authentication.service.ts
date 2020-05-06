import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IAuthentication } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  login(user): Observable<IAuthentication> {
    return this.http.post<IAuthentication>(
      `${environment.urlHeroku}/login`,
      user
    );
  }

  logout(): void {
    this.http.get(`${environment.urlHeroku}/logout`).subscribe(() => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    });
  }
}
