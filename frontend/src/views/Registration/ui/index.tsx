import React from 'react';
import styles from './Registration.module.scss'
import Link from 'next/link';
const Registration = () => {
    return (
        <div>
            <div className={styles.topDiv}>
            <form className={styles.mainDiv}>
                <h1>Регистрация</h1>
                <input placeholder="Придумайте логин" className={styles.input_style}/>
                <input placeholder="Придумайте пароль" className={styles.input_style}/>
                <input placeholder="Повторите пароль" className={styles.input_style}/>
                <h5 style={{color: "red", marginBottom: -15}}>НЕ СТАВЬТЕ СВОЙ НАСТОЯЩИЙ ПАРОЛЬ!</h5>
                <button className={styles.btn}>Зарегестрироваться</button>
            </form>
        </div>
        </div>
    );
};

export default Registration;