import IVehicle from "./Vehicle";

export default interface IModel extends IVehicle {
  modelos?: IVehicle[];
}
