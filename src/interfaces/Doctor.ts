import User from "./User";

export default interface Doctor {
  _id: string;
  id: User;
  specialty: string;
  experience: number;
  fee: number;
}
