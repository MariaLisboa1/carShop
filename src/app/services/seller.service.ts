import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ISeller } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class SellerService {
  constructor(private http: HttpClient) {}

  createSeller(seller): Observable<ISeller> {
    return this.http.post<ISeller>(`${environment.urlHeroku}/users/`, seller);
  }
}
