import { useNavigate } from 'react-router-dom';
import { authenticationInitial, AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import { loginInitial } from '../../authentication/presentation/login-slice';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AUTH_LOCAL_STORAGE_KEY } from '../constants';
import styles from './shared.module.css';

/* Put here the logout resets of states and local storage and cookies */
const logout = (dispatch: any )=>{
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    dispatch(loginInitial());
    dispatch(authenticationInitial());
}

export default function Logout(){
    const dispatch = useAppDispatch();

    return (
        <div className={styles.logoutContainer} onClick={ () => logout(dispatch)}>
            <div className={styles.logout}>
                LOGOUT
            </div>
        </div>
    );
}