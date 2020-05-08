import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  clients: any;
  noHaveClients = false;
  visibleLoading = true;

  constructor(
    private router: Router,
    private toast: Toast,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.clientService.getAllClients().subscribe(
      (clients) => {
        this.visibleLoading = false;
        this.clients = clients;
        if (this.clients) return;

        this.noHaveClients = true;
      },
      () => {
        this.visibleLoading = false;
        this.showMessageError();
      }
    );
  }

  converteLowerCase(name: string) {
    return name.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  deleteClient(id: number) {
    this.clientService.delete(id).subscribe(
      () => {
        this.clients = this.clients.filter((client) => client._id !== id);
        this.toast.emitToastSuccess("Cliente deletado com sucesso.");
      },
      () => this.showMessageError()
    );
  }

  editClient(id) {
    this.router.navigate(["/edit-client"], { queryParams: { id } });
  }

  showMessageError() {
    this.toast.emitToastError(
      "Ocorreu um erro, por favor tente mais tarde.",
      "Erro"
    );
  }
}
