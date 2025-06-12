export interface Message {
  id: number;
  userId: number;
  text: string;
  createdAt: Date;
  readAt?: Date;
}
