"use client";

import s from "./LogoutBlock.module.scss";
import { useAuthStore } from "@/shared/stores";
import { useUsersStore } from "@/shared/stores/users";

export default function LogoutBlock() {
	const { logout, user } = useAuthStore();
	const { currentUser } = useUsersStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<div>
			{user?.id === currentUser?.id ? (
				<button className={s.logout} onClick={handleLogout}>
					Выйти
				</button>
			) : null}
		</div>
	);
}
