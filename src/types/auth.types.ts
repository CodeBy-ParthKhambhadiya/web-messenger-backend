export interface IRegisterBody {
  avatar: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IForgotPasswordBody {
  email: string;
  mobile: string;
  newPassword?: string;
}
export interface IUser extends Document {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
