"use client";

import { ChangeEvent, useEffect, useState } from "react";
import s from "./Login.module.scss";
import { Submit } from "@/shared/ui";
import { CustomInput } from "@/shared/ui";
import { CustomForm } from "@/shared/ui";
import { useLogin } from "@/shared/lib";
import { setFormDataValue } from "@/shared/lib";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IRegistrationSubmitData } from "@/shared/lib";
import { redirect } from "next/navigation";
import OAuth2Google from "@/widgets/OAuth2Google";

export default function Login() {
	const [formData, setFormData] = useState<IRegistrationSubmitData>({
		username: "",
		password: "",
		rePassword: "",
		email: "",
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { submitLogin } = useLogin();

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const [accessToken, setAccessToken] = useState<string>("");

	useEffect(() => {
		const token = window.location.search.split("=")[1];
		if (token) {
			setAccessToken(token);
			window.localStorage.setItem("accessToken", token);
			window.location.href = "/";
		}
	}, []);

	return (
		<div className={s.container}>
			<CustomForm onSubmit={() => submitLogin(formData)}>
				<div className={s.headerContainer}>
					<p className={s.activeHeader}>Авторизация</p>
					<Link href="/auth/register">
						<p className={s.authHeader}>Регистрация</p>
					</Link>
				</div>
				<CustomInput
					placeholder="Ваш логин"
					className={s.input}
					value={formData.username}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setFormDataValue(setFormData, formData, "username", e.target.value)
					}
				/>
				<div className={s.passwordBlock}>
					<CustomInput
						type={showPassword ? "text" : "password"}
						placeholder="Ваш пароль"
						className={s.input}
						value={formData.password}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setFormDataValue(
								setFormData,
								formData,
								"password",
								e.target.value,
							)
						}
					/>
					{showPassword ? (
						<FaEyeSlash
							className={s.eyeIcon}
							onClick={changePasswordVisibility}
						/>
					) : (
						<FaEye className={s.eyeIcon} onClick={changePasswordVisibility} />
					)}
				</div>
				<OAuth2Google />
				<Submit> Войти </Submit>
			</CustomForm>
		</div>
	);
}
