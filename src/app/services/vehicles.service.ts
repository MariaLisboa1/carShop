import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IBrand, IModel, IYear, IValue } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  getVehicleBrands(path: string): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${environment.url}/${path}/marcas`);
  }

  getModels(path: string, id: number): Observable<IModel> {
    return this.http.get<IModel>(
      `${environment.url}/${path}/marcas/${id}/modelos`
    );
  }

  getYear(path: string, idBrand: number, idModel: number): Observable<IYear[]> {
    return this.http.get<IYear[]>(
      `${environment.url}/${path}/marcas/${idBrand}/modelos/${idModel}/anos`
    );
  }

  getValue(
    path: string,
    idBrand: number,
    idModel: number,
    year: string
  ): Observable<IValue> {
    return this.http.get<IValue>(
      `${environment.url}/${path}/marcas/${idBrand}/modelos/${idModel}/anos/${year}`
    );
  }
}
