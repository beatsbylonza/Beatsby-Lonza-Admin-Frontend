import UserModel from "./domain/user.model";

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps{
    user: UserModel
}
