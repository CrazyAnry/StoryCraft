import { ReactNode } from "react";
import styles from "./RemoveSceneButton.module.scss";

interface Props {
	onClick: () => void;
	children?: ReactNode;
	className?: string;
}

export default function RemoveButton({ onClick, children, className }: Props) {
	return (
		<button
			onClick={onClick}
			className={styles.removeButton}
			title="Удалить сцену"
		>
			{children}
		</button>
	);
}
