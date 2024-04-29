export default interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pic: string;
  status: string;
  isAdmin: boolean;
  isDoctor: boolean;
  mobile?: number;
  age?: number;
  gender?: "male" | "female";
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
