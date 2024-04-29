import User from "./User";

export default interface Appointment {
  _id: string;
  userId: User;
  doctorId: User;
  date: Date;
  time: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}
