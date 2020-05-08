export class Builder {
  constructor() {}

  buildClient(form) {
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

    return {
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      birth_date: form.birth,
      address,
      vehicle,
    };
  }
}
