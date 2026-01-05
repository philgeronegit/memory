export interface MessageDto {
  id_message: number;
  id_user: number;
  text: string;
  created_at: Date;
  read_at?: Date;
}
