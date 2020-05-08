import toastr from "toastr";

export class Toast {
  constructor() {}

  async emitToastSuccess(message) {
    return toastr.success(message);
  }

  async emitToastError(
    message = "Ocorreu um erro, por favor tente mais tarde.",
    title = "Error"
  ) {
    return toastr.error(message, title);
  }
}
