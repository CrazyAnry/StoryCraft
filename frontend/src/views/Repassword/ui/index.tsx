"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Repassword.module.scss";
import { Submit } from "@/shared/ui";
import { CustomInput } from "@/shared/ui";
import { CustomForm } from "@/shared/ui";
import { setFormDataValue } from "@/shared/lib";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "@/shared/stores";
import { updateMe } from "@/shared/api/users/mutations";
import { toast } from "react-toastify";
import { me } from "@/shared/api/auth/queries";

export default function RepasswordPage() {
	const [formData, setFormData] = useState({
		password: "",
		rePassword: "",
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { user, setUser } = useAuthStore()
	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	
	const loginMe = async (token: string) => {
		const user = await me(token)
		setUser(user.user)
		window.localStorage.setItem("accessToken", user.tokens.accessToken);
		window.localStorage.setItem("refreshToken", user.tokens.refreshToken);
		console.log(213)
	}
	
	useEffect(() => {
		const token = window.location.search.split("=")[1];
		window.localStorage.setItem("accessToken", token);
		if (token)
			loginMe(token)
	}, [])

	const userPasswordChange = (id: number) => {
		if (formData.password === formData.rePassword && formData.password.length >= 6) {
			updateMe(id, {
				password: formData.password,
				newGoogleUser: false
			})
			window.location.href = "/";
		}
		else if(formData.password !== formData.rePassword){
			toast.error("Пароли не совпадают")
		}
		else if(formData.password.length < 6){
			toast.error("Пароль должен быть не менее 6 символов")
		}
	}

	return (
		<div className={s.container}>
			<CustomForm onSubmit={() => userPasswordChange(user!.id)}>
				<div className={s.passwordBlock}>
					<CustomInput
						className={s.input}
						type={showPassword ? "text" : "password"}
						value={formData.password}
						placeholder="Новый пароль..."
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
				<div className={s.passwordBlock}>
					<CustomInput
						className={s.input}
						type={showPassword ? "text" : "password"}
						value={formData.rePassword}
						placeholder="Повторите пароль..."
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setFormDataValue(
								setFormData,
								formData,
								"rePassword",
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
				<Submit> Подтвердить </Submit>
			</CustomForm>
		</div>
	);
}
