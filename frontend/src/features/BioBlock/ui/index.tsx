import { useAuthStore, useUsersStore } from "@/shared/stores";
import { updateMe } from "@/shared/api/users/mutations";
import { MdModeEdit } from "react-icons/md";
import s from "./BioBlock.module.scss";

export default function BioBlock() {
	const { currentUser, updateUser, accountInfoState, updateAccountInfoState } =
		useUsersStore();
	const { user } = useAuthStore();

	const { bioIsEditting, bioValue } = accountInfoState;

	const bio = currentUser?.bio;

	const handleBioEdit = () => {
		updateAccountInfoState({
			...accountInfoState,
			bioIsEditting: true,
			bioValue: bio || "",
		});
	};

	const handleBioSave = () => {
		if (bio === bioValue) {
			updateUser?.(currentUser!.id, { ...currentUser!, bio: bioValue });

			updateAccountInfoState({
				...accountInfoState,
				bioIsEditting: false,
			});
		} else {
			updateMe(currentUser!.id, { bio: bioValue });
			updateUser?.(currentUser!.id, { ...currentUser!, bio: bioValue });

			updateAccountInfoState({
				...accountInfoState,
				bioIsEditting: false,
			});
		}
	};

	const handleBioCancel = () => {
		updateAccountInfoState({
			...accountInfoState,
			bioIsEditting: false,
			bioValue: bio || "",
		});
	};

	const handleBioKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && e.shiftKey) {
			return;
		}
		if (e.key === "Enter") {
			handleBioSave();
		} else if (e.key === "Escape") {
			handleBioCancel();
		}
	};

	return (
		<div className={s.bioSection}>
			{user?.id === currentUser?.id ? (
				bioIsEditting ? (
					<div className={s.editContainer}>
						<textarea
							value={bioValue}
							onChange={(e) =>
								updateAccountInfoState({
									...accountInfoState,
									bioValue: e.target.value,
								})
							}
							onKeyDown={handleBioKeyPress}
							onBlur={handleBioSave}
							autoFocus
							className={s.editTextarea}
							placeholder="Добавьте описание..."
							rows={3}
						/>
						<p className={s.editText}>
							Нажмите Enter для сохранения или Escape для отмены
						</p>
					</div>
				) : (
					<div className={s.bioContainer}>
						<p className={s.bioText}>
							{bio || <i>Этот пользователь не имеет описания</i>}
						</p>
						<button
							className={s.edit}
							onClick={handleBioEdit}
							aria-label="Редактировать биографию"
						>
							<MdModeEdit />
						</button>
					</div>
				)
			) : (
				<p className={s.bioText}>
					{bio || <i>Этот пользователь не имеет описания</i>}
				</p>
			)}
		</div>
	);
}
