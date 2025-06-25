"use client"

import Link from "next/link";
import s from "./HeaderRight.module.scss";
import { useAuthStore } from "@/shared/stores/auth";
import { useState } from "react";

export default function HeaderRight() {
    const { isAuth, user } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className={`${s.hamburger} ${isOpen && s.open}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`${s.nav} ${isOpen ? s.open : ''}`}>
            <Link href="/create" onClick={() => setIsOpen(false)}>
              <span className={s.navLink} title="Создать">
                ✍️
                <span>Создать</span>
              </span>
            </Link>
            <Link href={isAuth ? `/account/${user?.id}` : "/auth/login"} onClick={() => setIsOpen(false)}>
              <span className={s.navLink} title="Профиль">
                👤
                <span>{isAuth ? "Профиль" : "Войти"}</span>
              </span>
            </Link>
            <Link href="/settings" onClick={() => setIsOpen(false)}>
              <span className={s.navLink} title="Настройки">
                ⚙️
                <span>Настройки</span>
              </span>
            </Link>
        </nav>
      </>
    )
}