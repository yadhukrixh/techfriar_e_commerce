"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import InputComponent from "@/modules/common/InputComponent/InputComponent";
import { handleLogin } from "../services/login-services";

interface PageProps{
  setShowLogin:(status:boolean)=>void;
}

const Login:React.FC<PageProps> = ({setShowLogin}) => {
  const [credential, setCredential] = useState("");
  const [password,setPassword] = useState("");

  const toggleAuth = () => {
    setShowLogin(false)
  }

  return (
    <div className={styles.card}>
      <img src="icons/cross-ash.svg" alt="Close" className={styles.closeIcon} />
      <h2 className={styles.heading}>Sign In</h2>
      <div className={styles.inputFieldWrapper}>
        <p className={styles.inputName}>Email or Phone Number</p>
        <InputComponent type="string" customClassName={styles.inputField} value={credential} onChange={setCredential}/>
        <p className="in-name">Password</p>
        <div className={styles.passwordField}>
        <InputComponent type="password" customClassName={styles.inputField} value={password} onChange={setPassword}/>
          <img
            src="icons/eye.svg"
            alt="Show Password"
            className={styles.eyeIcon}
          />
        </div>

        <button className={styles.signUpButton} onClick={()=>handleLogin(credential,password)}>Sign In</button>
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
