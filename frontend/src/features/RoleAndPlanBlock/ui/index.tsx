import { capitalized } from "@/shared/lib";
import s from "./RoleAndPlanBlock.module.scss";
import { useUsersStore } from "@/shared/stores/users";
import Link from "next/link";

export default function RoleAndPlanBlock() {
	const { currentUser } = useUsersStore();
	const { accountInfoState } = useUsersStore();
	const { role, plan } = currentUser!;
	return (
		<div className={s.roleContainer}>
			<p
				className={s.roleInfo}
				style={
					accountInfoState.usernameIsEditting ? { marginTop: "-1.5px" } : {}
				}
			>
				<span>{capitalized(role.toString())}</span>
				<span> {capitalized(plan.toString())} plan</span>
			</p>

			<div className={s.buttonWrapper}>
				<Link href="/billing" className={s.buyPlanLink}>
					<button className={s.buyPlan}>
						<span>Выбрать подписку</span>
					</button>
				</Link>
			</div>
		</div>
	);
}
