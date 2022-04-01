
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
import { addProductInitial, AddProductState, selectAddProduct } from '../../products/presentation/slices/add-product-slice';
import { removeProduct, removeProductInitial, RemoveProductState, selectRemoveProduct } from '../../products/presentation/slices/remove-product-slice';
import { selectUpdateProduct, updateProductInitial, UpdateProductState } from '../../products/presentation/slices/update-product-slice';




/* Private Route Wrapper */
export default function PrivateRouteWrapper (props : { index ?: boolean}) {

  const authenticationState  = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();


  if(authenticationState.status === AuthenticationState.initial){
    const auth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

    if(auth){
      
      const decodedToken : UserModel = jwt_decode(auth);
      dispatch(authenticationSuccess({ user : decodedToken, token: auth}));
      
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

  const [failsAlert, setFailsAlert] = useState<{status: boolean, message?: string}>({
    status: false,
  });
  
  
  const loginState  = useAppSelector(selectLogin);
  const addProductState = useAppSelector(selectAddProduct);
  const removeProductState = useAppSelector(selectRemoveProduct);
  const updateProductState = useAppSelector(selectUpdateProduct);

  const dispatch = useAppDispatch();

  /** Login State */
  useEffect(()=>{
    switch(loginState){
      case LoginState.inProgress:
        toggleLoading(true);
        break;
      case LoginState.initial:
        showAlert(setSuccessAlert,'Logout Successful!');
        toggleLoading(false);
        break;
      case LoginState.success:
        showAlert(setSuccessAlert,'Login Successful!');
        dispatch(addProductInitial());
        toggleLoading(false);
        break;
      case LoginState.fails:
        showAlert(setFailsAlert,'Login Unsuccessful!');
        dispatch(addProductInitial());
        toggleLoading(false);
        break;
    }

  },[loginState, dispatch]);

  
  /** Add Product State */
  useEffect(()=>{
    switch(addProductState.status){
      case AddProductState.inProgress:
        toggleLoading(true);
        break;
      case AddProductState.success:
        showAlert(setSuccessAlert, addProductState.message);
        dispatch(addProductInitial());
        toggleLoading(false);
        break;
      case AddProductState.fail:
        showAlert(setFailsAlert, addProductState.message);
        dispatch(addProductInitial());
        toggleLoading(false);
        break;
    }

  },[addProductState, dispatch]);

  /** Remove Product State */
  useEffect(()=>{
    switch(removeProductState.status){
      case RemoveProductState.inProgress:
        toggleLoading(true);
        break;
      case RemoveProductState.success:
        showAlert(setSuccessAlert, removeProductState.message);
        dispatch(removeProductInitial());
        toggleLoading(false);
        break;
      case RemoveProductState.fail:
        showAlert(setFailsAlert, removeProductState.message);
        dispatch(addProductInitial());
        toggleLoading(false);
        break;
    }
  },[removeProductState, dispatch]);

  
  /** Update Product State */
  useEffect(()=>{
    switch(updateProductState.status){
      case UpdateProductState.inProgress:
        toggleLoading(true);
        break;
      case UpdateProductState.success:
        showAlert(setSuccessAlert, updateProductState.message);
        dispatch(updateProductInitial());
        toggleLoading(false);
        break;
      case UpdateProductState.fail:
        showAlert(setFailsAlert, updateProductState.message);
        dispatch(updateProductInitial());
        toggleLoading(false);
        break;
    }
  },[updateProductState, dispatch]);

  return (
    <div>
      <Outlet />
      <SnackbarAlert open={successAlert.status} severity="success" message={successAlert.message} />
      <SnackbarAlert open={failsAlert.status} severity="error" message={failsAlert.message} />
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