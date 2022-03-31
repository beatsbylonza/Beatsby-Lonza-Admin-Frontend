import styles from './login-page.module.css';
import logo from '../../../assets/image/logo.png';

import { useAppSelector, useAppDispatch } from '../../config/hooks';
import { LoginState, loginUser, selectLogin, } from './login-slice';
import { useNavigate  } from "react-router-dom";
import { useEffect, useRef } from 'react';


/* Login Page Module */
export default function LoginPage(){
  const currentState  = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useRef<any>(null);
  const password = useRef<any>(null);

  useEffect(()=>{

    switch(currentState){
      case LoginState.success:
        navigate("/orders", { replace: true });
        break;
      case LoginState.fails:
        /* Fail Action */
        break;
    }

  }, [currentState, navigate]);
  

  return(
    <div className={styles.container}>
      <div className={styles.leftSideContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.titleText}>Welcome to</p>
          <p className={styles.titleText}>Beatsby Lonza</p>
        </div>
        <div className={styles.emailContainer}>
          <p className={styles.inpuText}>Email</p>
          <input className={styles.input} ref={email}/>
        </div>
        <div className={styles.passwordContainer}>
          <p className={styles.inputText}>Password</p>
          <input type="password" className={styles.input} ref={password}/>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={()=> {
              dispatch(loginUser({email : email.current.value, password:  password.current.value}));
            }}>Login</button>
        </div>
      </div>
      <div className={styles.rightSideContainer}>
        <div className={styles.iamgeContainer}>
          <img alt="logo" src={logo}/>
        </div>
        <div>
          <p className={styles.rights}>2021 - All rights reserved </p>
        </div>
      </div>
    </div>
  );

}