import { LoginRepositoryResponse, LoginUserRepository } from "../../data/repository/authentication-repository";
import { LoginProps } from "../authentication.props";


export default function LoginUserUsecase(props: LoginProps ) : Promise<LoginRepositoryResponse> { 
    return LoginUserRepository(props);
}