import s from "./ButtonsUnderAvatar.module.scss";
import { IUser } from "@/shared/lib/types";

interface Props {
	user: IUser | null;
	currentUser: IUser;
	handleEditAvatar: () => void;
	handleFollow: () => void;
	handleUnfollow: () => void;
	handleFollowers: () => void;
	handleFollowing: () => void;
	followers: IUser[];
	followings: IUser[];
	isFollowed: boolean;
}

export default function ButtonsUnderAvatar({
	user,
	currentUser,
	handleEditAvatar,
	handleFollow,
	handleUnfollow,
	handleFollowers,
	handleFollowing,
	followers,
	followings,
	isFollowed,
}: Props) {
	return (
		<div className={s.avatarButtons}>
			{user?.id === currentUser?.id ? (
				<button onClick={handleEditAvatar} className={s.editButton}>
					Изменить аватар
				</button>
			) : isFollowed ? (
				<button onClick={handleUnfollow} className={s.followButton}>
					Отписаться
				</button>
			) : (
				<button onClick={handleFollow} className={s.followButton}>
					Подписаться
				</button>
			)}
			<button
				onClick={handleFollowers}
				className={s.followButton + " " + s.followers}
			>
				Подписчики ({followers.length})
			</button>
			<button
				onClick={handleFollowing}
				className={s.followButton + " " + s.following}
			>
				Подписки ({followings.length})
			</button>
		</div>
	);
}
