import React from "react";
import s from "./Submit.module.scss";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function Submit({ children, className }: Props) {
	return (
		<button type="submit" className={s.btn + " " + className}>
			{children}
		</button>
	);
}
