import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  get AuthToken() {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  constructor(private http: HttpClient) {}

  createClient(client) {
    return this.http.post(`${environment.urlHeroku}/clients/`, client, {
      headers: this.AuthToken,
    });
  }

  getAllClients() {
    return this.http.get(`${environment.urlHeroku}/clients/`, {
      headers: this.AuthToken,
    });
  }

  getById(id: number) {
    return this.http.post(`${environment.urlHeroku}/clients/${id}`, {
      headers: this.AuthToken,
    });
  }

  delete(id: number) {
    return this.http.delete(`${environment.urlHeroku}/clients/${id}`, {
      headers: this.AuthToken,
    });
  }

  update(id: number, client) {
    return this.http.put(`${environment.urlHeroku}/clients/${id}`, client, {
      headers: this.AuthToken,
    });
  }

  sendImage(avatar, id: string) {
    return this.http.put(
      `${environment.urlHeroku}/clients/image/${id}`,
      avatar,
      {
        headers: this.AuthToken,
      }
    );
  }
}
