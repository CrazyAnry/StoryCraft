"use client";

import React, { useEffect, useState } from "react";
import s from "./ReadHeader.module.scss";
import Link from "next/link";
import { useLikes } from "@/shared/lib";
import { useViews } from "@/shared/lib";
import { useAuthStore } from "@/shared/stores";
import { useReadingStoriesStore } from "@/shared/stores/readingStories";
import { useStories } from "@/shared/lib/hooks/useStories";

export default function ReadHeader() {
	const { getStory, oneStory } = useStories();
	const [storyLiked, setStoryLiked] = useState<boolean>(false);
	const { getLikesCount, getLikes, setLike, deleteLike, likesCount } =
		useLikes();
	const { getViews, views } = useViews();
	const { user } = useAuthStore();
	const { startAndUpdateStory, getStoryProgress } = useReadingStoriesStore();
	const [proggresScene, setProggresScene] = useState<number>();

	useEffect(() => {
		getStory();
	}, []);

	useEffect(() => {
		const isLiked = async () => {
			if (oneStory) {
				const likeRes = await getLikes(oneStory.id!);
				likeRes.map((like) => {
					if (like.userId === user!.id) {
						setStoryLiked(true);
					}
				});
				const proggresRes = getStoryProgress(oneStory.id!, user!.id);
				if (!proggresRes) {
					startAndUpdateStory(
						oneStory.id!,
						user!.id,
						oneStory.scenes[0].id,
					);
				}
				setProggresScene(
					getStoryProgress(oneStory.id!, user!.id)?.currentSceneId,
				);
			}
		};

		isLiked();
	}, [oneStory]);

	useEffect(() => {
		if (oneStory) {
			getLikes(oneStory.id!);
			getLikesCount(oneStory.id!);
			getViews(oneStory.id!);
		}
	}, [oneStory]);

	if (!oneStory) {
		return <h1>Загрузка...</h1>;
	}

	return (
		<div className={s.container}>
			<div className={s.titleRow}>
				<h2 className={s.titleText}>{oneStory!.title}</h2>
				<h2 className={s.scenesCount}>
					Количество сцен: {oneStory.scenes.length}
				</h2>
			</div>
			<div className={s.imgContainer}>
				<img
					className={s.img}
					src={oneStory.image ? oneStory.image : "/NoImg.png"}
				/>
				<h3 className={s.description}>{oneStory!.description}</h3>
				<div className={s.likeContainer}>
					<button
						onClick={() => {
							storyLiked ? deleteLike(oneStory.id!) : setLike(oneStory.id!);
							setStoryLiked(!storyLiked);
						}}
						className={storyLiked ? s.deliveredLike : s.undeliveredLike}
					>
						❤ {likesCount}
					</button>
					<h4>👀 {views}</h4>
				</div>
			</div>
			<div className={s.btnContainer}>
				<Link href={`/read/${oneStory!.id}/${proggresScene}`}>
					<button className={s.btn}>Читать</button>
				</Link>
			</div>
		</div>
	);
}
