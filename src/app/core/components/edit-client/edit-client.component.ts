import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenericValidator } from "src/app/shared/helpers/validateCpf/validateCpf";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"],
})
export class EditClientComponent implements OnInit {
  editProfileForm: FormGroup;

  vehicleSrc = "../../../../assets/images/vehicle.png";

  imageSrc: any;
  selectFile: File = null;
  cpf: string;
  client: any;
  clients: any;

  vehicles = [
    { nome: "Carros", codigo: "carros" },
    { nome: "Motos", codigo: "motos" },
    { nome: "Caminhões", codigo: "caminhoes" },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.cpf = queryParams["cpf"];
      this.inicializer();
    });

    this.editProfileForm = this.fb.group({
      name: this.fb.control(this.client.name, [Validators.required]),
      cpf: this.fb.control({ value: this.client.cpf, disabled: false }, [
        Validators.required,
        GenericValidator.isValidCpf(),
      ]),
      phone: this.fb.control(this.client.phone, [Validators.required]),
      birth: this.fb.control({ value: this.client.birth, disabled: false }, [
        Validators.required,
        GenericValidator.isValidDate(),
      ]),
      photo: this.fb.control(""),
      cep: this.fb.control(this.client.cep, [Validators.required]),
      publicPlace: this.fb.control(this.client.publicPlace, [
        Validators.required,
      ]),
      num: this.fb.control(this.client.num, [Validators.required]),
      neighborhood: this.fb.control(this.client.neighborhood, [
        Validators.required,
      ]),
      vehicle: this.fb.control(this.client.vehicle),
      brand: this.fb.control(this.client.brand),
      model: this.fb.control(this.client.model),
      year: this.fb.control(this.client.year),
    });
  }

  inicializer() {
    this.clients = JSON.parse(localStorage.getItem("register"));
    this.client = this.clients.find((client) => client.cpf === this.cpf);
  }

  editClient(clientEdit) {
    this.clients = this.clients.filter(
      (client) => client.cpf !== clientEdit.cpf
    );

    this.clients.push(clientEdit);

    localStorage.setItem("register", JSON.stringify(this.clients));

    this.toast.emitToastSuccess("Cliente atualizado com sucesso.");

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 2000);
  }
}
