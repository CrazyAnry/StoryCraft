"use client";

import s from "./OAuth2Google.module.scss";
import Image from "next/image";

export default function OAuth2Google({
	isRegister = false,
}: {
	isRegister?: boolean;
}) {
	return (
		<div className={s.container}>
			<button
				className={s.btn}
				onClick={() =>
					window.open(
						"https://redesigned-telegram-x544j66v9wrgh69wq-3002.app.github.dev/users/auth/google/login",
						"_parent",
					)
				}
			>
				<div className={s.imageWrapper}>
					<Image src="/google.svg" alt="Google" width={24} height={24} />
				</div>
				{isRegister ? "Зарегистрироваться" : "Войти"}
				<br />с помощью Google
			</button>
		</div>
	);
}
