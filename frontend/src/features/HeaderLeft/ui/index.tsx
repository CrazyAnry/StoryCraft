import Link from "next/link";
import s from "./HeaderLeft.module.scss";

export default function HeaderLeft() {
	return (
		<div className={s.brand}>
			<Link href="/">
				<span className={s.brandLogo}>StoryCraft</span>
			</Link>
			<span className={s.brandSlogan}>Бесконечные сюжеты</span>
		</div>
	);
}
