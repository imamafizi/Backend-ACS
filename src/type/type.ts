export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data {
  user: IUser[];
}
