import { updateMe } from "@/shared/api/users/mutations";
import { useAuthStore, useUsersStore } from "@/shared/stores";
import s from "./UsernameBlock.module.scss";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

export default function UsernameBlock() {
	const { currentUser, updateUser, accountInfoState, updateAccountInfoState } =
		useUsersStore();
	const { user } = useAuthStore();

	const { usernameIsEditting, usernameValue } = accountInfoState;

	const username = currentUser?.username;
	const isVerified = currentUser?.isVerified;

	const handleUsernameEdit = () => {
		updateAccountInfoState({
			...accountInfoState,
			usernameIsEditting: true,
			usernameValue: username || "",
		});
	};

	const handleUsernameSave = async () => {
		if (
			!usernameValue ||
			usernameValue.length < 3 ||
			usernameValue.length > 16
		) {
			toast.error("Username must be between 3 and 16 characters");
			return;
		}
		try {
			const updatedUser = await updateMe(currentUser!.id, {
				username: usernameValue,
			});
			if (!updatedUser) {
				return;
			}

			updateUser?.(currentUser!.id, {
				...currentUser!,
				username: usernameValue,
			});
			updateAccountInfoState({
				...accountInfoState,
				usernameIsEditting: false,
			});
		} catch (error) {
			toast.error("Username already exists or something went wrong");
		}
	};

	const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			handleUsernameCancel();
		}
	};

	const handleUsernameCancel = () => {
		updateAccountInfoState({
			...accountInfoState,
			usernameIsEditting: false,
			usernameValue: username || "",
		});
	};

	return (
		<h1 className={s.username}>
			{user?.id === currentUser?.id ? (
				usernameIsEditting ? (
					<div className={s.editContainer}>
						<input
							type="text"
							value={usernameValue}
							onChange={(e) =>
								updateAccountInfoState({
									...accountInfoState,
									usernameValue: e.target.value,
								})
							}
							onKeyDown={handleUsernameKeyPress}
							onBlur={handleUsernameSave}
							autoFocus
							className={s.editInput}
						/>
					</div>
				) : (
					<>
						<div className={s.usernameContainer}>
							<span>{username}</span>
							<button
								className={s.edit}
								onClick={handleUsernameEdit}
								aria-label="Редактировать имя пользователя"
							>
								<MdModeEdit />
							</button>
						</div>
					</>
				)
			) : (
				<span>{username}</span>
			)}

			{isVerified && (
				<>
					<img
						className={s.verified}
						src="/verified.png"
						alt="Verified user"
						title="This user is verified"
					/>
				</>
			)}
		</h1>
	);
}
