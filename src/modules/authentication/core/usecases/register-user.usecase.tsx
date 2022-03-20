import { UseCase } from "../base/use-case";
import { UserModel } from "../domain/user.model";
import { AuthenticationRepository } from "../repositories/authentication.repository";

export default class RegisterUseCase implements UseCase<UserModel, void>{
    
    constructor(private authenticationRepository: AuthenticationRepository ){}


    execute(params: UserModel): void {
        this.authenticationRepository.registerUser(params);
    }

}