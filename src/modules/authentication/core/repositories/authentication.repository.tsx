import { UserModel } from "../domain/user.model";

export abstract class AuthenticationRepository{

    abstract loginUser(auth: {username: string, password: string}): void;
    abstract registerUser(user: UserModel): void;

}