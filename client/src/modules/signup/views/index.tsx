import React, { useState } from 'react';
import styles from './signup.module.css'
import InputComponent from '@/modules/common/InputComponent/InputComponent';
import { userSignup } from '../services/sign-up-services';

interface PageProps{
  setShowLogin:(status:boolean)=>void;
}

export interface SignupErrors{
  name:string;
  credential:string;
  password:string;
}

const SignUp:React.FC<PageProps> = ({setShowLogin}) => {

  const [credential,setCredential] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [errorMessages,setErrorMessages] = useState<SignupErrors>();

  const toggleAuth = () => {
    setShowLogin(true)
  }

  return (
    <div className={styles.card}>
      <img src="icons/cross-ash.svg" alt="Close" className={styles.closeIcon} />
            <h2 className={styles.heading}>Sign Up</h2>
            <div className={styles.inputFieldWrapper}>
                <p className={styles.inputName}>Name</p>
                <InputComponent type="string" customClassName={styles.inputField} value={name} onChange={setName}/>
                <p className={styles.errorMessage}>{errorMessages?.name}</p>

                <p className={styles.inputName}>Email or Phone Number</p>
                <InputComponent type="string" customClassName={styles.inputField} value={credential} onChange={setCredential}/>
                <p className={styles.errorMessage}>{errorMessages?.credential}</p>

                <p className="in-name">Password</p>
                <div className={styles.passwordField}>
                <InputComponent type="password" customClassName={styles.inputField} value={password} onChange={setPassword}/>
                    <img src="icons/eye.svg" alt="Show Password" className={styles.eyeIcon} />
                </div>
                <p className={styles.errorMessage}>{errorMessages?.password}</p>
       
                <button className={styles.signUpButton} onClick={()=>{userSignup(name,credential,password,setErrorMessages)}}>Sign Up</button>
                <p className={styles.signInText}>Already have an account? <a onClick={toggleAuth}
                        className={styles.signInLink}>Sign In</a></p>
            </div>
    </div>
  )
}

export default SignUp
