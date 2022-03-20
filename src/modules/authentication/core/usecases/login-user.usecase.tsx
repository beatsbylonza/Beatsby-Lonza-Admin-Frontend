import { UseCase } from "../base/use-case";
import { AuthenticationRepository } from "../repositories/authentication.repository";

export default class LoginUserUseCase implements UseCase<{username: string, password: string},void>{
    
    constructor(private authenticationRepository: AuthenticationRepository ){}

    execute(params: { username: string; password: string; }): void {
        this.authenticationRepository.loginUser(params);
    }

}