"use client"
import React, { useState } from 'react';
import styles from './login.module.css'
import Login from '@/modules/login/views/login';
import SignUp from '@/modules/signup/views';

const page = () => {
  const [showLogin,setShowLogin] = useState(true)
  return (
    <div className={styles.loginPage}>
        {showLogin ?
          <Login setShowLogin={setShowLogin} />:<SignUp setShowLogin={setShowLogin}/>
        }
    </div>
  )
}

export default page
