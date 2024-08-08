export interface IUser {
  id: number;
  email: string;
  username: string;
  badge: string;
  jabatan: string;
  company: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data {
  user: IUser[];
}
