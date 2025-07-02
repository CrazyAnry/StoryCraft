import { IUser } from "@/shared/lib";
import { FollowUser } from "@/entities";
import s from "./followsBlock.module.scss";

export default function FollowsBlock({ accounts }: { accounts: IUser[] }) {
	return (
		<div className={s.container}>
			{accounts
				.filter((account) => account && account.id) // Фильтруем невалидные записи
				.map((account) => (
					<FollowUser
						key={account.id}
						id={account.id}
						avatarUrl={account.avatarUrl}
						username={account.username}
					/>
				))}
		</div>
	);
}
