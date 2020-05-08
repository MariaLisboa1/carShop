export interface IClienteVehicle {
  image: string;
  value: string;
  brand: string;
  model: string;
  yearModel: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  vehicleType: number;
  fuelAbbreviation: string;
  type: string;
  year: string;
}

export interface IClientAddress {
  cep: string;
  publicPlace: string;
  num: string;
  neighborhood: string;
}

export default interface IClient {
  _id?: string;
  name: string;
  cpf: string;
  phone: string;
  birth_date: string;
  address: IClientAddress;
  vehicle: IClienteVehicle;
}
