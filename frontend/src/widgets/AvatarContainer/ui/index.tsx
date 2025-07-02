"use client";

import s from "./AvatarContainer.module.scss";
import { useAuthStore } from "@/shared/stores";
import { useUsersStore } from "@/shared/stores/users";
import { Modal, NewModal } from "@/shared/ui";
import { useState, useRef, useEffect } from "react";
import { updateMe } from "@/shared/api/users/mutations";
import { MdModeEdit } from "react-icons/md";
import {
	FastAverageColor,
	FastAverageColorResult,
	FastAverageColorRgb,
} from "fast-average-color";
import { IFollow, IUser } from "@/shared/lib/types";
import { follow, unfollow } from "@/shared/api/follow/mutations";
import { FollowsBlock } from "@/features";
import ButtonsUnderAvatar from "@/features/ButtonsUnderAvatar/ui/ButtonsUnderAvatar.module";
import Image from "next/image";

export default function AvatarContainer() {
	const { user } = useAuthStore();
	const {
		currentUser,
		updateUser,
		addFollow,
		removeFollow,
		allFollows,
		getAccountFollowers,
	} = useUsersStore();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showModalFollowers, setShowModalFollowers] = useState<boolean>(false);
	const [showModalFollowing, setShowModalFollowing] = useState<boolean>(false);
	const [avatarUrlValue, setAvatarUrlValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const fac = new FastAverageColor();
	const [shadowColor, setShadowColor] = useState<string>("#666666"); // Default fallback color
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const [isFollowed, setIsFollowed] = useState<boolean>(false);
	const [followings, setFollowings] = useState<IUser[]>([]);
	const [followers, setFollowers] = useState<IUser[]>([]);

	useEffect(() => {
		if (allFollows && user?.id && currentUser?.id) {
			const isFollowed = allFollows.some(
				(follow) =>
					follow.followerId === currentUser.id &&
					follow.followingId === user.id,
			);
			setIsFollowed(isFollowed);
		}
	}, [allFollows, user?.id, currentUser?.id]);

	useEffect(() => {
		if (showModal && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showModal]);

	useEffect(() => {
		const img = imgRef.current;
		if (!img || !imageLoaded) return;

		// Only analyze color if image is loaded and has a valid source
		const isDefaultImage = img.src.includes("withoutAvatar.png");

		if (isDefaultImage) {
			// Set a default color for the placeholder image
			setShadowColor("#666666");
			return;
		}

		fac
			.getColorAsync(img)
			.then((res: FastAverageColorResult) => {
				setShadowColor(res.rgb);
			})
			.catch((error) => {
				console.warn("FastAverageColor error:", error);
				// Fallback to default color on error
				setShadowColor("#666666");
			});
	}, [currentUser?.avatarUrl, imageLoaded]);

	if (!currentUser) return null;

	const { avatarUrl, username, id } = currentUser;

	const handleEditAvatar = () => {
		setShowModal(true);
		setAvatarUrlValue(avatarUrl || "");
	};

	const handleFollowers = () => {
		setShowModalFollowers(true);
	};

	const handleFollowing = () => {
		setShowModalFollowing(true);
	};

	const handleFollow = () => {
		if (!user?.id) return;
		addFollow({
			id: allFollows.length + 1,
			followerId: currentUser.id,
			followingId: user.id,
			follower: currentUser,
			following: user,
			followerUser: [currentUser],
			followingUser: [user],
			followedUser: [user],
		});
		setIsFollowed(true);
		follow(currentUser.id);
	};

	const handleUnfollow = () => {
		if (!user?.id) return;
		removeFollow(user.id, currentUser.id);
		setIsFollowed(false);
		unfollow(currentUser.id);
	};

	const handleSaveAvatar = () => {
		if (avatarUrlValue.trim() !== (avatarUrl || "")) {
			updateUser?.(id, { ...currentUser, avatarUrl: avatarUrlValue });
			updateMe(id, { avatarUrl: avatarUrlValue });
		}
		setShowModal(false);
	};

	const handleCancelAvatar = () => {
		setAvatarUrlValue(avatarUrl || "");
		setShowModal(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSaveAvatar();
		} else if (e.key === "Escape") {
			handleCancelAvatar();
		}
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			}
		};

		if (showModalFollowers || showModalFollowing) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [showModalFollowers, showModalFollowing]);

	const closeModal = () => {
		setShowModal(false);
		setShowModalFollowers(false);
		setShowModalFollowing(false);
	};

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.currentTarget;
		if (target.src !== location.origin + "/withoutAvatar.png") {
			target.src = "/withoutAvatar.png";
			setImageLoaded(true); // Mark as loaded even for fallback
		}
	};

	useEffect(() => {
		if (allFollows && currentUser?.id) {
			const followings = allFollows
				.filter((follow) => follow.followingId === currentUser.id)
				.flatMap((follow) => follow.followedUser)
				.filter((user): user is IUser => Boolean(user?.id))
				.filter(
					(user, index, self) =>
						index === self.findIndex((u) => u.id === user.id),
				);

			const followers = allFollows
				.filter((follow) => follow.followerId === currentUser.id)
				.flatMap((follow) => follow.followingUser) // Use all users in the array
				.filter((user): user is IUser => Boolean(user?.id)) // Type-safe filter
				.filter(
					(user, index, self) =>
						index === self.findIndex((u) => u.id === user.id),
				); // Deduplicate

			setFollowings(followings);
			setFollowers(followers);
		}
	}, [allFollows, currentUser?.id]);

	return (
		<div className={s.avatarContainer}>
			<img
				src={`/api/image-proxy?url=${encodeURIComponent(avatarUrl || "/withoutAvatar.png")}`}
				alt="avatar"
				title={username}
				className={s.avatar}
				onLoad={handleImageLoad}
				onError={handleImageError}
				ref={imgRef}
				style={{
					boxShadow: `0 0 25px 5px ${shadowColor}`,
					border: `2px solid ${shadowColor}`,
				}}
			/>
			<ButtonsUnderAvatar
				user={user}
				currentUser={currentUser}
				handleEditAvatar={handleEditAvatar}
				handleFollow={handleFollow}
				handleUnfollow={handleUnfollow}
				handleFollowers={handleFollowers}
				handleFollowing={handleFollowing}
				followers={followers}
				followings={followings}
				isFollowed={isFollowed}
			/>
			{showModal && (
				<NewModal setIsVisible={setShowModal} isVisible={showModal}>
					<div className={s.modalContent}>
						<h3>Изменить аватар</h3>
						<div className={s.inputContainer}>
							<input
								type="text"
								value={avatarUrlValue}
								onChange={(e) => setAvatarUrlValue(e.target.value)}
								onKeyDown={handleKeyDown}
								ref={inputRef}
								placeholder="Введите URL аватара"
								className={s.avatarInput}
							/>
							<button
								className={s.editButton}
								onClick={handleSaveAvatar}
								aria-label="Сохранить аватар"
							>
								<MdModeEdit />
							</button>
						</div>
						<div className={s.modalButtons}>
							<button onClick={handleSaveAvatar} className={s.saveButton}>
								Сохранить
							</button>
							<button onClick={handleCancelAvatar} className={s.cancelButton}>
								Отмена
							</button>
						</div>
					</div>
				</NewModal>
			)}
			{showModalFollowers && (
				<NewModal
					setIsVisible={setShowModalFollowers}
					isVisible={showModalFollowers}
				>
					<div onKeyDown={handleKeyDown} className={s.modalContent}>
						<h3 className={s.modalTitle}>Подписчики ({followers.length})</h3>
						{followers.length > 0 ? (
							<FollowsBlock accounts={followers} />
						) : (
							<div className={s.emptyState}>
								<div className={s.orbit}>
									<div className={s.planet}></div>
									<div className={s.ring}></div>
								</div>
								<h4 className={s.emptyTitle}>Пока нет подписчиков</h4>
								<p className={s.emptyText}>
									Когда у вас появятся подписчики, они отобразятся здесь
								</p>
							</div>
						)}
					</div>
				</NewModal>
			)}

			{showModalFollowing && (
				<NewModal
					setIsVisible={setShowModalFollowing}
					isVisible={showModalFollowing}
				>
					<div onKeyDown={handleKeyDown} className={s.modalContent}>
						<h3 className={s.modalTitle}>Подписки ({followings.length})</h3>
						{followings.length > 0 ? (
							<FollowsBlock accounts={followings} />
						) : (
							<div className={s.emptyState}>
								<div className={s.orbit}>
									<div className={s.planet}></div>
									<div className={s.ring}></div>
								</div>
								<h4 className={s.emptyTitle}>Вы ни на кого не подписаны</h4>
								<p className={s.emptyText}>
									Начните подписываться на других пользователей, чтобы видеть их
									здесь
								</p>
							</div>
						)}
					</div>
				</NewModal>
			)}
		</div>
	);
}
