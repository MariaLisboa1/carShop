import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Toast } from "src/app/shared/helpers/toast/toast";
import { ClientService } from "src/app/services/client.service";
import { Builder } from "src/app/shared/helpers/builder/builder";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"],
})
export class EditClientComponent implements OnInit {
  editProfileForm: FormGroup;

  vehicleSrc = "../../../../assets/images/vehicle.png";
  loadingForm = true;
  imageSrc: any;
  selectFile: File = null;
  id: string;
  client: any;
  clients: any;
  visibleLoading = false;

  vehicles = [
    { nome: "Carros", codigo: "carros" },
    { nome: "Motos", codigo: "motos" },
    { nome: "Caminhões", codigo: "caminhoes" },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: Toast,
    private clientService: ClientService,
    private builder: Builder
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams["id"];
      this.clientService.getById(this.id).subscribe((client) => {
        this.client = client;
        this.createFormEdit();
      });
    });
  }

  createFormEdit() {
    this.editProfileForm = this.fb.group({
      name: this.fb.control(this.client.name),
      cpf: this.fb.control(this.client.cpf),
      phone: this.fb.control(this.client.phone),
      birth: this.fb.control(this.client.birth_date),
      photo: this.fb.control(this.client.vehicle.image),
      cep: this.fb.control(this.client.address.cep),
      publicPlace: this.fb.control(this.client.address.publicPlace),
      num: this.fb.control(this.client.address.num),
      neighborhood: this.fb.control(this.client.address.neighborhood),
      vehicle: this.fb.control(this.client.vehicle.type),
      brand: this.fb.control(this.client.vehicle.brand),
      model: this.fb.control(this.client.vehicle.model),
      year: this.fb.control(this.client.vehicle.year),
    });
    this.loadingForm = false;
  }

  editClient() {
    this.visibleLoading = true;
    this.selectFile = this.editProfileForm.value.photo;
    const client = this.builder.buildClient(this.editProfileForm.value);

    this.clientService.update(this.id, client).subscribe(
      () => this.updateImage(),
      () => this.toast.emitToastError()
    );
  }

  updateImage() {
    const photo = new FormData();
    const file = this.selectFile;

    if (typeof file != "string") {
      Object.defineProperty(file, "image", {
        writable: true,
        value: this.id + ".png",
      });

      photo.append("image", file, file.name);

      this.clientService.sendImage(photo, this.id).subscribe(
        () => {
          this.toast.emitToastSuccess("Foto editada com sucesso.");
          this.router.navigate(["/home"]);
          this.visibleLoading = false;
        },
        () => {
          this.visibleLoading = false;
          this.toast.emitToastError();
        }
      );
      return;
    }
    this.visibleLoading = false;
    this.toast.emitToastSuccess("Cliente editado com sucesso.");
    this.router.navigate(["/home"]);
  }

  deleteClient() {
    this.clientService.delete(this.client._id).subscribe(
      () => {
        this.toast.emitToastSuccess("Cliente deletado com sucesso.");
        this.router.navigate(["/home"]);
      },
      () => this.toast.emitToastError()
    );
  }
}
