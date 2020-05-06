import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  clients: any;
  noHaveClients = false;

  constructor(private router: Router, private toast: Toast) {}

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

  deleteClient(cpf) {
    this.clients = this.clients.filter((client) => client.cpf !== cpf);
    localStorage.setItem("register", JSON.stringify(this.clients));
    this.toast.emitToastSuccess("Cliente deletado com sucesso.");
  }

  editClient(cpf) {
    this.router.navigate(["/edit-client"], { queryParams: { cpf } });
  }
}
