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
import { emailVerify } from "@/shared/api/users/mutations";

export default function Registration() {
  const [formData, setFormData] = useState<IRegistrationSubmitData>({
    username: "",
    password: "",
    rePassword: "",
    email: "",
  });
  const { submitRegistration, submitRegisterCode } = useRegistration();
  const [isSending, setIsSending] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [code, setCode] = useState<{ currentCode: null | string, inputCode: string }>({ currentCode: null, inputCode: "" })
  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    !isSending ? <div className={s.container}>
      <CustomForm onSubmit={async (e) => {
        submitRegistration(e, formData, setIsSending)
        const res = await emailVerify(formData.email)
        setCode({ ...code, currentCode: res })
      }}>
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
    </div> : <div className={s.codeContainer}>
      <h2 className={s.codeTitle}>Введите код подтверждения</h2>
      <p className={s.codeSubtitle}>Мы отправили 6-значный код на вашу почту</p>

      <div className={s.codeInputs}>
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={code.inputCode[i] || ''}
            onChange={(e) => {
              const newCode = [...code.inputCode];
              newCode[i] = e.target.value;
              setCode({ ...code, inputCode: newCode.join('') });
            }}
            className={s.codeInput}
            autoFocus={i === 0}
          />
        ))}
      </div>

      <div className={s.codeButtons}>
        <button
          onClick={() => submitRegisterCode(formData, code)}
          className={s.primaryButton}
        >
          Подтвердить
        </button>
        <button
          onClick={() => setIsSending(false)}
          className={s.secondaryButton}
        >
          Назад
        </button>
      </div>

      <div className={s.resendCode}>
        Не получили код? <span>Отправить снова</span>
      </div>
    </div>
  );
}
