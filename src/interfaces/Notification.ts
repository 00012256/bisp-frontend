import User from "./User";

export default interface Notification {
  _id: string;
  userId: User["_id"];
  isRead: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
}
