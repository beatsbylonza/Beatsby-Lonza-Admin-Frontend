
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AuthenticationState, authenticationSuccess, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import UserModel from '../../authentication/core/domain/user.model';
import { AUTH_LOCAL_STORAGE_KEY } from '../constants';
import Loading from './loading';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LoginState, selectLogin } from '../../authentication/presentation/login-slice';
import { Slide, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';




/* Private Route Wrapper */
export default function PrivateRouteWrapper (props : { index ?: boolean}) {

  const authenticationState  = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();


  if(authenticationState.status === AuthenticationState.initial){
    const auth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

    if(auth){
      
      const decodedToken : UserModel = jwt_decode(auth);
      dispatch(authenticationSuccess(decodedToken));
      
      /* Authentication Success approve route! */
      return props.index ? <Navigate to={'/orders'}/> : <StackedOutlet /> ;
    }
  }


  if(authenticationState.status === AuthenticationState.success){
    return props.index ?  <Navigate to={'/orders'}/> : <StackedOutlet /> ;
  }else{
    return props.index ?  <StackedOutlet /> : <Navigate to={'/'}/> ;
  }
};

function StackedOutlet(){
  const [loading, toggleLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState<{status: boolean, message?: string}>({
    status: false,
  });
  
  const loginState  = useAppSelector(selectLogin);


  useEffect(()=>{
    switch(loginState){
      case LoginState.inProgress:
        toggleLoading(true);
        break;
      case LoginState.initial:
        showAlert(setSuccessAlert,'Logout Successful!');
        break;
      case LoginState.success:
        showAlert(setSuccessAlert,'Login Successful!');
        toggleLoading(false);
        break;
    }

  },[loginState]);

  return (
    <div>
      <Outlet />
      <SnackbarAlert open={successAlert.status} severity="success" message={successAlert.message} />
      <Loading 
        open={loading}
      ></Loading>
    </div>
  );
}

function showAlert(
  toggleStateAction : Dispatch<SetStateAction<{ status: boolean; message?: string | undefined; }>>, 
  message: string
){
  toggleStateAction({
    status: true,
    message: message,
  });

  setTimeout(()=>{
    toggleStateAction({
      status: false,
      message: message,
    });
  },3000);
}

function SnackbarAlert(props: any){

  const { open, severity, message } = props;
  
  return(
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical : 'top', horizontal : 'center'}} TransitionComponent={Slide}>
        <MuiAlert severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
  )
}