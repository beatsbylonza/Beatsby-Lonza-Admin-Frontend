
import { authenticationInitial, } from '../../authentication/presentation/authentication-slice';
import { loginInitial } from '../../authentication/presentation/login-slice';
import { useAppDispatch } from '../../config/hooks';
import { AUTH_LOCAL_STORAGE_KEY } from '../constants';

/* Put here the logout resets of states and local storage and cookies */
const logout = (dispatch: any )=>{
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    dispatch(loginInitial());
    dispatch(authenticationInitial());
}

export default function Logout(){
    const dispatch = useAppDispatch();

    return (
        <div className='flex w-full justify-center items-center' onClick={ () => logout(dispatch)}>
            <div className='flex justify-center items-center bg-white py-2 px-6 rounded-full cursor-pointer font-bold'>
                LOGOUT
            </div>
        </div>
    );
}