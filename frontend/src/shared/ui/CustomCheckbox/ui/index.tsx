import { ReactNode } from "react";
import s from "./CustomCheckbox.module.scss";

interface CustomCheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	icon?: ReactNode;
	disabled?: boolean;
}

const CustomCheckbox = ({
	checked,
	onChange,
	label,
	icon,
	disabled,
}: CustomCheckboxProps) => {
	return (
		<label
			className={s.checkboxLabel + (disabled ? " " + s.disabled : "")}
			title={disabled ? "В разработке" : ""}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className={s.checkboxInput}
				disabled={disabled}
			/>
			<span className={`${s.checkboxBox} ${checked ? s.active : ""}`}>
				{checked && <span className={s.icon}>{icon}</span>}
			</span>
			{label && <span>{label}</span>}
		</label>
	);
};

export default CustomCheckbox;
