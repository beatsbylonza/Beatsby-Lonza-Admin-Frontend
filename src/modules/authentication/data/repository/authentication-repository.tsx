import axios from "axios";
import UserModel from "../../core/domain/user.model";
import { LoginProps, RegisterProps } from "../../core/props/authentication.props";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


export interface LoginRepositoryResponse{
    data: {
        message: string;
        token: string;
    }
}

export interface RegisterRepositoryResponse{
    data :{
        message: string;
        token: string;
    }
}

export interface AuthenticateTokenRepositoryResponse{
    data: {
        message: string;
        user: UserModel,
    }
}

export function LoginUserRepository(props : LoginProps) : Promise<LoginRepositoryResponse> {
    return axios.post(`${REACT_APP_API_URL}/login`, props);
}

export function RegisterUserRepository(props : RegisterProps) : Promise<RegisterRepositoryResponse> {
    return axios.get('');
}