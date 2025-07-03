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
				type="button"
				className={s.btn}
				onClick={(e) =>{
					e.preventDefault()
					window.open(
						`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/google/login`,
						"_parent",
					)
				}
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