export type Registration = {
  id: string;
  name: string;
  email: string;
  avatar: FileList;
  role: string;
  device_token: string;
  cpf: number;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
  password: string;
};
