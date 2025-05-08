'use client'
import { useState } from 'react';
import styles from './Login.module.scss'
import { useRouter } from 'next/router';
import Link from 'next/link';
const Login = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    type User = {
        login: string
        password: string
    }
    function submLogin(e: any){
        e.preventDefault()
        const userData:User ={
            login: login,
            password: password
        }
        localStorage.setItem("userData", JSON.stringify(userData))
    }
    return (
        <div className={styles.topDiv}>
            <form className={styles.mainDiv} onSubmit={submLogin}>
                <h1>Авторизация</h1>
                <input placeholder="Ваш логин" value={login} onChange={(e:any) => setLogin(e.target.value)} className={styles.input_style}/>
                <input placeholder="Ваш пароль" value={password} onChange={(e:any) => setPassword(e.target.value)} className={styles.input_style}/>
                <h5 style={{color: "red", marginBottom: -50}}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={styles.btn}><Link href="/">Войти</Link></button>
            </form>
        </div>
    );
};

export default Login;