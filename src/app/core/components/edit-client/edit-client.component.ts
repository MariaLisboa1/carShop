import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";
import { ClientService } from "src/app/services/client.service";

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
    private clientService: ClientService
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
      name: this.fb.control(this.client.name, [Validators.required]),
      cpf: this.fb.control({ value: this.client.cpf, disabled: false }, [
        Validators.required,
        GenericValidator.isValidCpf(),
      ]),
      phone: this.fb.control(this.client.phone, [Validators.required]),
      birth: this.fb.control(
        { value: this.client.birth_date, disabled: false },
        [Validators.required, GenericValidator.isValidDate()]
      ),
      photo: this.fb.control(this.client.vehicle.image),
      cep: this.fb.control(this.client.address.cep, [Validators.required]),
      publicPlace: this.fb.control(this.client.address.publicPlace, [
        Validators.required,
      ]),
      num: this.fb.control(this.client.address.num, [Validators.required]),
      neighborhood: this.fb.control(this.client.address.neighborhood, [
        Validators.required,
      ]),
      vehicle: this.fb.control(this.client.vehicle.type),
      brand: this.fb.control(this.client.vehicle.brand),
      model: this.fb.control(this.client.vehicle.model),
      year: this.fb.control(this.client.vehicle.year),
    });
    console.log(this.client);
    console.log(this.client.vehicle.image);

    this.loadingForm = false;
  }

  editClient() {
    this.visibleLoading = true;

    this.clientService.update(this.id, this.assembleClient()).subscribe(
      () => this.updateImage(),
      () => {
        this.toast.emitToastError(
          "Ocorreu um erro, por favor tente mais tarde.",
          "Erro"
        );
      }
    );
  }

  updateImage() {
    const photo = new FormData();

    if (typeof this.selectFile != "string") {
      Object.defineProperty(this.selectFile, "image", {
        writable: true,
        value: this.id + ".png",
      });

      photo.append("image", this.selectFile, this.selectFile.name);

      this.clientService.sendImage(photo, this.id).subscribe(
        () => {
          this.toast.emitToastSuccess("Foto editada com sucesso.");
          this.router.navigate(["/"]);
          this.visibleLoading = false;
        },
        () => {
          this.visibleLoading = false;
          this.toast.emitToastError(
            "Ocorreu um erro, por favor tente mais tarde.",
            "Erro"
          );
        }
      );
      return;
    }
    this.visibleLoading = false;
    this.toast.emitToastSuccess("Cliente editado com sucesso.");
    this.router.navigate(["/"]);
  }

  assembleClient() {
    const form = this.editProfileForm.value;
    this.selectFile = form.photo;

    const address = {
      cep: form.cep,
      publicPlace: form.publicPlace,
      num: form.num,
      neighborhood: form.neighborhood,
    };

    const vehicle = {
      type: form.vehicle,
      brand: form.brand,
      model: form.model,
      year: form.year,
      value: form.value.value,
      yearModel: form.value.yearModel,
      fuel: form.value.yearMfuelodel,
      codeFipe: form.value.codeFipe,
      referenceMonth: form.value.referenceMonth,
      vehicleType: form.value.vehicleType,
      fuelAbbreviation: form.value.fuelAbbreviation,
    };

    const client = {
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      birth_date: form.birth,
      address,
      vehicle,
    };

    return client;
  }

  deleteClient() {
    this.clientService.delete(this.client._id).subscribe(
      () => {
        this.toast.emitToastSuccess("Cliente deletado com sucesso.");
        this.router.navigate(["/"]);
      },
      () => {
        this.toast.emitToastError(
          "Ocorreu um erro ao excluir o cliente. Tente mais tarde.",
          "Erro"
        );
      }
    );
  }
}
