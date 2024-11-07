"use client";
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import InputComponent from "@/modules/common/InputComponent/InputComponent";
import { handleLogin } from "../services/login-services";

interface PageProps{
  setShowLogin:(status:boolean)=>void;
}

export interface ErrorMessages{
  credential:string;
  password:string;
}

const Login:React.FC<PageProps> = ({setShowLogin}) => {
  const [credential, setCredential] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessages,setErrorMessages] = useState<ErrorMessages>();
  const [type,setType] = useState('password');
  const [eyeImage,setEyeImage] = useState("icons/eye.svg")

  const toggleAuth = () => {
    setShowLogin(false)
  }

  const eyeToggle = () => {
    setType(type === 'text'?'password':'text');
    setEyeImage(type === 'text'?"icons/eye.svg":"icons/eye-fill.svg")
  }


  return (
    <div className={styles.card}>
      <img src="icons/cross-ash.svg" alt="Close" className={styles.closeIcon} />
      <h2 className={styles.heading}>Sign In</h2>
      <div className={styles.inputFieldWrapper}>
        <p className={styles.inputName}>Email or Phone Number</p>
        <InputComponent type="string" customClassName={styles.inputField} value={credential} onChange={setCredential}/>
        <p className={styles.errorMessage}>{errorMessages?.credential}</p>
        <p className="in-name">Password</p>
        <div className={styles.passwordField}>
        <InputComponent type={type} customClassName={styles.inputField} value={password} onChange={setPassword}/>
          <img
            src={eyeImage}
            alt="Show Password"
            className={styles.eyeIcon}
            onClick={eyeToggle}
          />
        </div>
        <p className={styles.errorMessage}>{errorMessages?.password}</p>

        <button className={styles.signUpButton} onClick={()=>handleLogin(credential,password,setErrorMessages)}>Sign In</button>
        <p className={styles.signInText}>
          Dont Have an account?{" "}
          <a  className={styles.signInLink} onClick={toggleAuth}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
