import { RegisterRepositoryResponse, RegisterUserRepository } from "../../data/repository/authentication-repository";
import { RegisterProps } from "../props/authentication.props";


export default function RegisterUserUsecase(props: RegisterProps ) : Promise<RegisterRepositoryResponse> { 
    return RegisterUserRepository(props);
}