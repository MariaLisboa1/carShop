import toastr from "toastr";

export class Toast {
  constructor() {}

  async emitToastSuccess(message) {
    return toastr.success(message);
  }

  async emitToastError(message, title) {
    return toastr.error(message, title);
  }
}
