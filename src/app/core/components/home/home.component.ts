import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  clients: any;
  noHaveClients = false;

  constructor() {}

  ngOnInit() {
    this.clients = JSON.parse(localStorage.getItem("register"));
    if (this.clients) return;

    this.noHaveClients = true;
  }

  converteLowerCase(name: string) {
    return name.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  deleteClient(clientCpf) {
    this.clients = this.clients.filter((client) => client.cpf !== clientCpf);
    localStorage.setItem("register", JSON.stringify(this.clients));
  }
}
