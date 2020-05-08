import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IClient } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  get AuthToken() {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  constructor(private http: HttpClient) {}

  createClient(client): Observable<IClient> {
    return this.http.post<IClient>(`${environment.urlHeroku}/clients`, client, {
      headers: this.AuthToken,
    });
  }

  getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${environment.urlHeroku}/clients/`, {
      headers: this.AuthToken,
    });
  }

  getById(id: string) {
    return this.http.get(`${environment.urlHeroku}/clients/${id}`, {
      headers: this.AuthToken,
    });
  }

  delete(id: string) {
    return this.http.delete(`${environment.urlHeroku}/clients/${id}`, {
      headers: this.AuthToken,
    });
  }

  update(id: string, client): Observable<IClient> {
    return this.http.put<IClient>(
      `${environment.urlHeroku}/clients/${id}`,
      client,
      {
        headers: this.AuthToken,
      }
    );
  }

  sendImage(image, id: string) {
    return this.http.post(
      `${environment.urlHeroku}/clients/image/${id}`,
      image,
      {
        headers: this.AuthToken,
      }
    );
  }
}
