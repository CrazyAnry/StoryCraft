"use client";

import { useRegistration } from "@/shared/lib";
import { CustomForm, CustomInput, Submit } from "@/shared/ui";
import { ChangeEvent, useState } from "react";
import s from "./Registration.module.scss";
import { IRegistrationSubmitData } from "@/shared/lib";
import { setFormDataValue } from "@/shared/lib";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth2Google from "@/widgets/OAuth2Google";

export default function Registration() {
  const [formData, setFormData] = useState<IRegistrationSubmitData>({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });
  const { submitRegistration } = useRegistration();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.container}>
      <CustomForm onSubmit={() => submitRegistration(formData)}>
        <div className={s.headerContainer}>
          <Link href="/auth/login"><p className={s.authHeader}>Авторизация</p></Link>
          <p className={s.activeHeader}>Регистрация</p>
        </div>
        <CustomInput
          className={s.input}
          value={formData.username}
          placeholder="Имя пользователя..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "username", e.target.value)
          }
        />
        <CustomInput
          className={s.input}
          type="email"
          value={formData.email}
          placeholder="Email..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormDataValue(setFormData, formData, "email", e.target.value)
          }
        />

        <div className={s.passwordBlock}>
          <CustomInput
            className={s.input}
            type={showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Пароль..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormDataValue(
                setFormData,
                formData,
                "password",
                e.target.value
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
                e.target.value
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
        <Submit className={s.submit}>Зарегистрироваться</Submit>
      </CustomForm>
    </div>
  );
}
