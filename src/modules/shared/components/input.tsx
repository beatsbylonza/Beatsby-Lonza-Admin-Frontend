import styles from './login-page.module.css';

export default function Input(){
    return (
        <div className={styles.passwordContainer}>
          <p className={styles.inputText}>Password</p>
          <input type="password" className={styles.input}/>
        </div>
    );
}